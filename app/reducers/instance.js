import {
  SET_INSTANCE_PARAM,
  TOGGLE_PARAM,
  SET_MAX_ITER,
  SET_OUT_DIR,
  ADD_SIMULATION_PASS,
  RESET_SIMULATION
} from '../actions/instanceActions';
import type { Action } from './types';

const initialState = {
  version: 'unknown-version',
  capability: 'unkwown-capability',
  chrono: false,
  HDF5: false,
  MPI: false,
  problemName: 'unknown-problem',
  maxIter: 0,
  outDir: 'tests',
  simulation: []
};

export default function instance(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_SIMULATION_PASS:
      return {
        ...state,
        simulation: [...state.simulation, action.simulationPass]
      };
    case RESET_SIMULATION:
      return {
        ...state,
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
