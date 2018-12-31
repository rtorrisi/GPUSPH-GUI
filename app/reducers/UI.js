import { TOGGLE_DRAWER } from '../actions/UIActions';
import type { Action } from './types';

const initialState = {
  isDrawerOpen: false
};

export default function UI(state = initialState, action: Action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen
      };
    default:
      return state;
  }
}
