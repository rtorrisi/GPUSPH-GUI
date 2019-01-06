import * as os from 'os';

import { TOGGLE_DRAWER, SET_TERMINAL_PATH } from '../actions/UIActions';
import type { Action } from './types';

const initialState = {
  isDrawerOpen: false,
  terminalPath:
    os.platform() === 'win32'
      ? 'PowerShell.exe'
      : process.env.SHELL || '/bin/bash'
};

export default function UI(state = initialState, action: Action) {
  switch (action.type) {
    case SET_TERMINAL_PATH:
      return { ...state, terminalPath: action.path };
    case TOGGLE_DRAWER:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen
      };
    default:
      return state;
  }
}
