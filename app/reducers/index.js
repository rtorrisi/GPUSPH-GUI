// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import instance from './instance';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    instance
  });
}
