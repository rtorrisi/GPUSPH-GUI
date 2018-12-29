// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

import Footer from './Footer';
import Header from './Header';
import Chart from './Chart';

import styles from './styles/Dashboard.css';

import GPUSPHLogo from '../../resources/gpusph-logo.png';

type Props = {
  urlParseParam: string => void,
  resetSimulation: () => void,
  addSimulationPass: (simulationPass: {}) => void,
  toggleParam: string => void,
  setMaxIter: () => void,
  setOutDir: () => void,
  version: string,
  problemName: string,
  HDF5: boolean,
  MPI: boolean,
  chrono: boolean,
  capability: string,
  outDir: string,
  simulation: [],
  maxIter: number
};

export default class Dashboard extends Component<Props> {
  componentWillMount = () => {
    const { urlParseParam } = this.props;
    urlParseParam(document.location.href);
  };

  componentDidMount = () => {
    const { addSimulationPass } = this.props;
    // ipcRenderer.on('stdout:data', (event, data) => {
    //    shellOutput: `${this.state.shellOutput}\n$ ${data}`
    // });

    ipcRenderer.on('simPass:data', (event, simulationPass) => {
      addSimulationPass(simulationPass);
    });
  };

  componentWillUnmount = () => {
    ipcRenderer.removeListener('stdout:data');
    ipcRenderer.removeListener('simPass:data');
  };

  startSimulation = () => {
    const { maxIter, outDir, resetSimulation } = this.props;

    resetSimulation();
    const GPUSPHArguments = [
      '--maxiter',
      maxIter,
      '--dir',
      outDir //  tests//Landslide
    ];
    ipcRenderer.send('process:start', GPUSPHArguments);
  };

  stopSimulation = () => ipcRenderer.send('process:stop');

  render() {
    const {
      version,
      problemName,
      HDF5,
      MPI,
      chrono,
      capability,
      maxIter,
      outDir,
      simulation,
      toggleParam,
      setMaxIter,
      setOutDir
    } = this.props;
    return (
      <div className={styles.frame}>
        <Header leftTitle={problemName} rightTitle={version} />
        <div className={styles.schema}>
          <div className={styles.leftBar}>
            {capability}
            <Chip
              icon={HDF5 ? <DoneIcon /> : null}
              label="HDF5"
              onClick={() => toggleParam('HDF5')}
              className={styles.chips}
            />
            <Chip
              icon={MPI ? <DoneIcon /> : null}
              label="MPI"
              onClick={() => toggleParam('MPI')}
              className={styles.chips}
            />
            <Chip
              icon={chrono ? <DoneIcon /> : null}
              label="Chrono"
              onClick={() => toggleParam('chrono')}
              className={styles.chips}
            />
            <Card style={{ margin: '10px', padding: '10px' }}>
              <Button variant="contained" onClick={this.startSimulation}>
                Run Simulation
              </Button>
              <TextField
                label="Out directory"
                value={outDir}
                onChange={event => setOutDir(event.target.value)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Max iterations"
                value={maxIter}
                onChange={event => setMaxIter(event.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
              />
              <Button variant="contained" onClick={this.stopSimulation}>
                Stop Simulation
              </Button>
            </Card>
          </div>
          <div className={styles.centralViewport}>
            <div className={styles.chartView}>
              <Chart
                chartTitle="Simulation Chart"
                chartTension={0.5}
                chartData={
                  simulation.length
                    ? simulation.map(elem => ({
                        x: elem.iteration,
                        y: elem.cum
                      }))
                    : [
                        { x: 42, y: 20 },
                        { x: 49, y: 18 },
                        { x: 52, y: 25 },
                        { x: 56, y: 20 },
                        { x: 59, y: 49 },
                        { x: 65, y: 45 },
                        { x: 70, y: 70 },
                        { x: 75, y: 29 },
                        { x: 80, y: 21 }
                      ]
                }
              />
            </div>
            <div style={{ flex: 1 }} />
          </div>
        </div>
        <Footer logo={GPUSPHLogo} version="0.0.1-alpha" />
      </div>
    );
  }
}
/*
  <div style={{ flex: 2, border: '3px solid orange' }}>
      <ScrollbarDiv className={styles.centralFrame}>
        {JSON.stringify(this.state.simulationInfo)}
      </ScrollbarDiv>  
  </div>
  
  <textarea value={this.state.shellOutput} onChange={this.handleChange} />
        {'Placeholder'}
  */
