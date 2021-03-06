import {
  SET_INSTANCE_PARAM,
  TOGGLE_PARAM,
  SET_MAX_ITER,
  SET_OUT_DIR,
  ADD_SIMULATION_PASS,
  REMOVE_OLD_SIMULATION_DATA,
  SET_RUNNING_SIMULATION_STATUS,
  SET_EXEC_PATH
} from '../actions/instanceActions';
import type { Action } from './types';

const initialState = {
  execPath: __dirname.slice(0, -4),
  version: 'unknown-version',
  capability: 'unkwown-capability',
  chrono: false,
  HDF5: false,
  MPI: false,
  problemName: 'unknown-problem',
  maxIter: 0,
  outDir: 'tests',
  numPass: 0,
  isSimulating: false,
  simulation: []
};

export default function instance(state = initialState, action: Action) {
  switch (action.type) {
    case SET_EXEC_PATH:
      return { ...state, execPath: action.path };
    case SET_RUNNING_SIMULATION_STATUS:
      return { ...state, isSimulating: action.status };
    case ADD_SIMULATION_PASS:
      return {
        ...state,
        numPass: state.numPass + 1,
        simulation: [
          ...state.simulation,
          { id: state.numPass, ...action.simulationPass }
        ]
      };
    case REMOVE_OLD_SIMULATION_DATA:
      return {
        ...state,
        numPass: 0,
        simulation: []
      };
    case SET_OUT_DIR:
      return { ...state, outDir: action.path };
    case SET_MAX_ITER:
      return {
        ...state,
        maxIter: action.iterations <= 0 ? 0 : action.iterations
      };
    case SET_INSTANCE_PARAM:
      return { ...state, ...action.data };
    case TOGGLE_PARAM:
      if (typeof state[action.param] === 'boolean') {
        return { ...state, [action.param]: !state[action.param] };
      }
      return state;
    default:
      return state;
  }
}
