import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './router/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./router/Root', () => {
    // eslint-disable-next-line global-require
    const HotRoot = require('./router/Root').default;
    render(
      <AppContainer>
        <HotRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
