// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import type { Store } from '../reducers/types';

import HomePage from '../containers/HomePage';

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <HomePage />
        </ConnectedRouter>
      </Provider>
    );
  }
}
