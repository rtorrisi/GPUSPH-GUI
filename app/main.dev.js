/* eslint global-require: off */

/**
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack.
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { spawn } = require('child_process');

let GPUSPHProcess = null;
let execPath = `${__dirname.slice(0, -4).replace(/\\/g, '/')}`;

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

async function getVersion() {
  return exec(`"${execPath}/GPUSPH" --version`);
}

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;
let splash = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });
  mainWindow.setMinimumSize(800, 600);

  splash = new BrowserWindow({
    width: 400,
    height: 130,
    frame: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true
  });

  splash.setIgnoreMouseEvents(true);

  splash.loadURL(`file://${__dirname}/splashScreen/splash.html`);

  let appUrl = `file://${__dirname}/app.html`;
  await getVersion()
    .then(res => {
      const { stdout, stderr, error } = res;
      console.log(stdout);
      if (stderr) console.log(stderr);
      if (error) console.log('error ', error);

      appUrl += `?data=${JSON.stringify(parseGPUSPHInfo(stdout))}`;
      return true;
    })
    .catch(err => console.log(err));

  mainWindow.loadURL(appUrl);
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => splash.destroy(), 1000);

    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  ipcMain.on('process:start', (event, GPUSPHArguments) => {
    runSimulation(GPUSPHArguments);
  });

  ipcMain.on('process:stop', () => {
    console.log('killing process');
    GPUSPHProcess.kill();
  });

  ipcMain.on('execPath:change', (event, path) => {
    execPath = `${path[0].replace(/\\/g, '/')}`;

    getVersion()
      .then(res => {
        const { stdout, stderr, error } = res;
        console.log(stdout);
        if (stderr) console.log(stderr);
        if (error) console.log('error ', error);

        const data = parseGPUSPHInfo(stdout);
        mainWindow.webContents.send('execPath:updateInfo', data);
        return true;
      })
      .catch(err => console.log(err));
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function parseGPUSPHInfo(data) {
  const GPUSPHInfo = {};
  const lines = data.split('\n');

  let start = lines[0].indexOf('version') + 8;
  let end = lines[0].length - 1;
  GPUSPHInfo.version = lines[0].substring(start, end);

  start = lines[1].indexOf('capability') + 11;
  end = lines[1].length - 1;
  GPUSPHInfo.capability = lines[1].substring(start, end);

  start = lines[2].indexOf('Chrono :') + 9;
  end = lines[2].length - 1;
  GPUSPHInfo.chrono = lines[2].substring(start, end) === 'disabled';

  start = lines[3].indexOf('HDF5   :') + 9;
  end = lines[3].length - 1;
  GPUSPHInfo.HDF5 = lines[3].substring(start, end) === 'disabled';

  start = lines[4].indexOf('MPI    :') + 9;
  end = lines[4].length - 1;
  GPUSPHInfo.MPI = lines[4].substring(start, end) === 'disabled';

  start = lines[5].indexOf('problem') + 9;
  end = lines[5].lastIndexOf('"');
  GPUSPHInfo.problemName = lines[5].substring(start, end);

  return GPUSPHInfo;
}

function runSimulation(GPUSPHArguments) {
  if (GPUSPHProcess) GPUSPHProcess.kill();
  GPUSPHProcess = spawn(`${execPath}/GPUSPH`, GPUSPHArguments);

  GPUSPHProcess.stdout.on('data', data => {
    const lines = data.toString().split('\n');
    const re = new RegExp('^(Simulation time)');

    lines.forEach(element => {
      if (re.test(element)) {
        const lineInfo = {
          MIPPS: {}
        };
        const indices = {
          start: 0,
          end: 0
        };

        lineInfo.time = element.substring(
          (indices.start = indices.end + 18), // "Simulation time t=".length() = 18
          (indices.end = element.indexOf('s', indices.start))
        );

        lineInfo.iteration = element
          .substr(
            (indices.start = indices.end + 13), // "s, iteration=".length() = 13
            (indices.end = element.indexOf('dt', indices.start) - 2) -
              indices.start
          )
          .replace(',', '');

        lineInfo.dt = element.substr(
          (indices.start = indices.end + 5), // ", dt=".length() = 5
          (indices.end = element.indexOf('s', indices.start)) - indices.start
        );

        lineInfo.parts = element
          .substr(
            (indices.start = indices.end + 3), // "s, ".length() = 3
            (indices.end = element.indexOf('parts', indices.start) - 1) -
              indices.start
          )
          .replace(',', '');

        lineInfo.MIPPS.last = element.substr(
          (indices.start = indices.end + 8), // " parts (".length() = 8
          (indices.end = element.indexOf(',', indices.start)) - indices.start
        );
        lineInfo.MIPPS.cum = element.substr(
          (indices.start = indices.end + 7), // ", cum. ".length() = 7
          (indices.end = element.indexOf('MIPPS', indices.start) - 1) -
            indices.start
        );
        lineInfo.maxneibs = element
          .substr(indices.end + 17) // "MIPPS), maxneibs ".length() = 17
          .replace(/(\r\n|\n|\r)/gm, '');

        mainWindow.webContents.send('simPass:data', lineInfo);
      }
    });
    // mainWindow.webContents.send('stdout:data', data);
    console.log(`stdout: ${data}`);
  });

  GPUSPHProcess.stderr.on('data', data => {
    mainWindow.webContents.send('stderr:data', data);
    console.log(`stderr: ${data}`);
  });

  GPUSPHProcess.on('close', code => {
    mainWindow.webContents.send('childClosed:code', code);
    console.log(`child process exited with code ${code}`);
  });
}
