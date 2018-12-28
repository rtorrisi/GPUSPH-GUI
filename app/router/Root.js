// @flow
import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import type { Store } from '../reducers/types';

import routes from './routes';
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
          <Fragment>
            <Switch>
              <Route path={routes.HOME} component={HomePage} />
            </Switch>
          </Fragment>
        </ConnectedRouter>
      </Provider>
    );
  }
}
