// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import { withStyles } from '@material-ui/core/styles';

import Footer from './Footer';
import Header from './Header';
import Chart from './Chart';
import DrawerBar from './DrawerBar';
import SimulationControlBar from './SimulationControlBar';

import styles from './styles/Dashboard.css';

import GPUSPHLogo from '../../resources/gpusph-logo.png';

const wstyles = () => ({});

type Props = {
  actions: {
    instanceActions: {
      urlParseParam: string => void,
      removeOldSimulationData: () => void,
      addSimulationPass: (simulationPass: {}) => void,
      toggleParam: string => void,
      setMaxIter: () => void,
      setOutDir: () => void
    },
    UIActions: {
      toggleDrawer: () => void
    }
  },
  version: string,
  problemName: string,
  outDir: string,
  simulation: [],
  maxIter: number,
  isSimulating: boolean,
  isDrawerOpen: boolean,
  classes: { linearColorPrimary: {}, linearBarColorPrimary: {} }
};

class Dashboard extends Component<Props> {
  constructor(props) {
    super(props);

    this.startStopSimulation = this.startStopSimulation.bind(this);
  }

  componentWillMount = () => {
    const { actions } = this.props;
    const { instanceActions } = actions;
    const { urlParseParam } = instanceActions;
    urlParseParam(document.location.href);
  };

  componentDidMount = () => {
    const { actions } = this.props;
    const { instanceActions } = actions;
    const { addSimulationPass, setRunningSimulationStatus } = instanceActions;

    // ipcRenderer.on('stdout:data', (event, data) => {
    //    shellOutput: `${this.state.shellOutput}\n$ ${data}`
    // });

    ipcRenderer.on('simPass:data', (event, simulationPass) => {
      addSimulationPass(simulationPass);
    });

    ipcRenderer.on('childClosed:code', () => {
      const { isSimulating } = this.props;
      if (isSimulating) setRunningSimulationStatus(false);
    });
  };

  componentWillUnmount = () => {
    ipcRenderer.removeListener('stdout:data');
    ipcRenderer.removeListener('simPass:data');
    ipcRenderer.removeListener('childClosed:code');
  };

  startStopSimulation = () => {
    const { isSimulating } = this.props;
    if (isSimulating) this.stopSimulation();
    else this.startSimulation();
  };

  startSimulation = () => {
    const { actions } = this.props;
    const { instanceActions } = actions;
    const {
      removeOldSimulationData,
      setRunningSimulationStatus
    } = instanceActions;
    removeOldSimulationData();
    setRunningSimulationStatus(true);

    const { maxIter, outDir } = this.props;
    const GPUSPHArguments = [
      '--maxiter',
      maxIter,
      '--dir',
      outDir //  tests//Landslide
    ];
    ipcRenderer.send('process:start', GPUSPHArguments);
  };

  stopSimulation = () => {
    const { actions } = this.props;
    const { instanceActions } = actions;
    const { setRunningSimulationStatus } = instanceActions;
    setRunningSimulationStatus(false);

    ipcRenderer.send('process:stop');
  };

  render() {
    const {
      version,
      problemName,
      maxIter,
      outDir,
      simulation,
      isSimulating,
      isDrawerOpen
    } = this.props;
    const { actions } = this.props;
    const { instanceActions, UIActions } = actions;
    const { setMaxIter, setOutDir } = instanceActions;
    const { toggleDrawer } = UIActions;

    return (
      <div className={styles.frame}>
        <Header leftTitle={problemName} rightTitle={version} />
        <div className={styles.schema}>
          <DrawerBar open={isDrawerOpen} toggleAction={toggleDrawer} />
          <div className={styles.centralViewport}>
            <div className={styles.chartView}>
              <Chart
                chartTitle="Performance Chart"
                xLabel="my X"
                yLabel="my Y"
                chartTension={0.5}
                chartData={simulation.map(elem => ({
                  x: elem.iteration,
                  y: elem.cum
                }))}
              />
            </div>
            <SimulationControlBar
              isSimulating={isSimulating}
              simulation={simulation}
              startStopSimulation={this.startStopSimulation}
              maxIter={maxIter}
              setMaxIter={setMaxIter}
              outDir={outDir}
              setOutDir={setOutDir}
            />
          </div>
        </div>
        <Footer logo={GPUSPHLogo} version="0.0.1-alpha" />
      </div>
    );
  }
}

export default withStyles(wstyles, { withTheme: true })(Dashboard);
