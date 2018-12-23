// @flow
import * as React from 'react';

import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import type { Store } from '../reducers/types';

import routes from './routes';

import CounterPage from '../containers/CounterPage';
import HomePage from '../containers/HomePage';

type Props = {
  store: Store,
  history: {}
};

export default class Root extends React.Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <Switch>
              <Route path={routes.COUNTER} component={CounterPage} />
              <Route path={routes.HOME} component={HomePage} />
            </Switch>
          </React.Fragment>
        </ConnectedRouter>
      </Provider>
    );
  }
}
