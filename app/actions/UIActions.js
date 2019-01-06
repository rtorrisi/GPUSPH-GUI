// @flow
import { remote } from 'electron';

export const SET_TERMINAL_PATH = 'SET_TERMINAL_PATH';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const NO_OP = 'NO_OP';

export function setTerminalPath() {
  const path = remote.dialog.showOpenDialog({
    title: 'Select a terminal',
    properties: ['openFile']
  });
  if (path) {
    return {
      type: SET_TERMINAL_PATH,
      path: path[0]
    };
  }
  return { type: NO_OP };
}

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER
  };
}
