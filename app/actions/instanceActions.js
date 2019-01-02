// @flow
export const SET_RUNNING_SIMULATION_STATUS = 'SET_RUNNING_SIMULATION_STATUS';
export const ADD_SIMULATION_PASS = 'ADD_SIMULATION_PASS';
export const REMOVE_OLD_SIMULATION_DATA = 'REMOVE_OLD_SIMULATION_DATA';
export const SET_OUT_DIR = 'SET_OUT_DIR';
export const SET_MAX_ITER = 'SET_MAX_ITER';
export const TOGGLE_PARAM = 'TOGGLE_PARAM';
export const SET_INSTANCE_PARAM = 'SET_INSTANCE_PARAM';

export function setRunningSimulationStatus(status: boolean) {
  return {
    type: SET_RUNNING_SIMULATION_STATUS,
    status
  };
}
export function removeOldSimulationData() {
  return {
    type: REMOVE_OLD_SIMULATION_DATA
  };
}

export function addSimulationPass(simulationPass: {}) {
  return {
    type: ADD_SIMULATION_PASS,
    simulationPass
  };
}

export function setOutDir(path: string) {
  return {
    type: SET_OUT_DIR,
    path
  };
}

export function setMaxIter(iterations: number) {
  return {
    type: SET_MAX_ITER,
    iterations
  };
}

export function toggleParam(param: string) {
  return {
    type: TOGGLE_PARAM,
    param
  };
}

export function urlParseParam(url: string) {
  const queryStart = url.indexOf('?') + 1;
  const queryEnd = url.indexOf('#') + 1 || url.length + 1;
  const query = url.slice(queryStart, queryEnd - 1);
  const pairs = query.replace(/\+/g, ' ').split('&');
  const parms = {};

  for (let i = 0; i < pairs.length; i += 1) {
    const nv = pairs[i].split('=', 2);
    const n = decodeURIComponent(nv[0]);
    const v = decodeURIComponent(nv[1]);
    if (!Object.prototype.hasOwnProperty.call(parms, n)) parms[n] = [];
    parms[n].push(nv.length === 2 ? v : null);
  }
  try {
    const data = JSON.parse(parms.data);
    return {
      type: SET_INSTANCE_PARAM,
      data
    };
  } catch (err) {
    return {
      type: SET_INSTANCE_PARAM,
      data: {}
    };
  }
}
