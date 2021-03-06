import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Infinite from '@material-ui/icons/AllInclusive';

import FilledCircleIcon from '../../resources/icons/filledCircle.svg';
import PlayIcon from '../../resources/icons/play.svg';
import StopIcon from '../../resources/icons/stop.svg';

import styles from './styles/SimulationControlBar.css';

type Props = {
  setMaxIter: () => void,
  setOutDir: () => void,
  startStopSimulation: () => void,
  outDir: string,
  simulation: [],
  isSimulating: boolean,
  maxIter: number,
  classes: { linearColorPrimary: {}, linearBarColorPrimary: {} }
};

class SimulationControlBar extends Component<Props> {
  createPercProgrInfo = (
    isSimulating: boolean,
    maxIter: integer,
    percProgress: integer
  ) => {
    if (isSimulating) {
      if (maxIter !== 0) return `${percProgress}%`;
      return <Infinite />;
    }
    return null;
  };

  createLinearProgress = (
    isSimulating: boolean,
    maxIter: integerm,
    percProgress: integer
  ) => {
    const { classes } = this.props;
    const { linearColorPrimary, linearBarColorPrimary } = classes;

    if (isSimulating) {
      if (maxIter !== 0) {
        return (
          <LinearProgress
            variant="determinate"
            value={percProgress}
            style={{ margin: '7px' }}
            classes={{
              colorPrimary: linearColorPrimary,
              barColorPrimary: linearBarColorPrimary
            }}
          />
        );
      }
      return (
        <LinearProgress
          style={{ margin: '7px' }}
          classes={{
            colorPrimary: linearColorPrimary,
            barColorPrimary: linearBarColorPrimary
          }}
        />
      );
    }
  };

  render() {
    const { setMaxIter, setOutDir, startStopSimulation } = this.props;
    const { simulation, maxIter, isSimulating, outDir, classes } = this.props;
    const percProgress = Math.floor(
      ((simulation.length ? simulation[simulation.length - 1].iteration : 0) *
        100) /
        maxIter
    );

    const {
      controlView,
      controlBar,
      controlCentralView,
      controlRightView,
      controlLeftView,
      controlCentralSubView,
      circle
    } = styles;
    const {
      inputLabel,
      inputLabelFocused,
      inputText,
      inputOutlineFocused,
      inputOutline,
      startButton,
      stopButton,
      percProgViewSimulating,
      percProgViewNotSimulating,
      progressViewSimulating,
      progressViewNotSimulating
    } = classes;

    return (
      <div className={controlView}>
        <div className={controlBar}>
          <div className={controlLeftView}>
            <TextField
              label="Out directory"
              value={outDir}
              onChange={event => setOutDir(event.target.value)}
              margin="normal"
              variant="outlined"
              style={{ margin: '0px' }}
              InputLabelProps={{
                classes: { root: inputLabel, focused: inputLabelFocused }
              }}
              InputProps={{
                className: inputText,
                classes: {
                  root: inputOutlineFocused,
                  focused: inputLabelFocused,
                  input: inputText,
                  notchedOutline: inputOutline
                }
              }}
            />
          </div>
          <div className={controlCentralView}>
            <div className={controlCentralSubView}>
              <Fab
                onClick={startStopSimulation}
                classes={{
                  root: classNames({
                    [stopButton]: isSimulating,
                    [startButton]: !isSimulating
                  })
                }}
                size="large"
                color="primary"
              >
                <img
                  style={{ width: '100%' }}
                  alt={isSimulating ? 'stop' : 'play'}
                  src={isSimulating ? StopIcon : PlayIcon}
                />
              </Fab>
              <img className={circle} alt="" src={FilledCircleIcon} />
            </div>
            <div
              className={classNames({
                [percProgViewSimulating]: isSimulating,
                [percProgViewNotSimulating]: !isSimulating
              })}
            >
              {this.createPercProgrInfo(isSimulating, maxIter, percProgress)}
            </div>
          </div>
          <div className={controlRightView}>
            <TextField
              label="Max iterations"
              value={maxIter}
              onChange={event => setMaxIter(event.target.value)}
              type="number"
              margin="normal"
              variant="outlined"
              style={{ margin: '0px' }}
              InputLabelProps={{
                classes: { root: inputLabel, focused: inputLabelFocused }
              }}
              InputProps={{
                className: inputText,
                classes: {
                  root: inputOutlineFocused,
                  focused: inputLabelFocused,
                  input: inputText,
                  notchedOutline: inputOutline
                }
              }}
            />
          </div>
        </div>
        <div
          className={classNames({
            [progressViewSimulating]: isSimulating,
            [progressViewNotSimulating]: !isSimulating
          })}
        >
          {this.createLinearProgress(isSimulating, maxIter, percProgress)}
        </div>
      </div>
    );
  }
}

const wstyles = () => ({
  inputText: {
    color: 'white',
    padding: '6px 14px'
  },
  inputLabel: {
    color: 'white',
    transform: 'translate(14px, 11px) scale(1)'
  },
  inputLabelFocused: {
    color: 'white !important'
  },
  inputOutline: {
    borderColor: 'rgba(255,255,255,0.5) !important'
  },
  inputOutlineFocused: {
    '&$inputLabelFocused $inputOutline': {
      borderColor: 'white !important'
    }
  },
  startButton: {
    position: 'absolute',
    left: '7px',
    bottom: '7px',
    zIndex: '12',
    backgroundColor: '#272a31',
    border: '2px solid #b1b7c2',
    transition: 'transform 1s',
    transform: 'rotate(0deg)'
  },
  stopButton: {
    position: 'absolute',
    left: '7px',
    bottom: '7px',
    zIndex: '12',
    backgroundColor: '#272a31',
    border: '2px solid #b1b7c2',
    transition: 'transform 2s',
    transform: 'rotate(180deg)'
  },
  percProgViewSimulating: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    opacity: '1',
    transition: 'flex 2s, opacity 4s'
  },
  percProgViewNotSimulating: {
    opacity: '0',
    transition: 'flex 1s, opacity 0.5s'
  },
  progressViewSimulating: {
    margin: '0px 4px',
    height: '20px',
    opacity: '1',
    transition: 'opacity 4s, height 2s'
  },
  progressViewNotSimulating: {
    height: '5px',
    opacity: '0',
    transition: 'opacity 4s, height 1s'
  },
  linearColorPrimary: {
    backgroundColor: '#00695c',
    padding: '1px',
    margin: '5px',
    borderRadius: '20px'
  },
  linearBarColorPrimary: {
    backgroundColor: '#00d6b4'
  }
});

export default withStyles(wstyles, { withTheme: true })(SimulationControlBar);
