import { persistor, store } from '@/Store/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './common';

const render = __ISOMORPHIC__ ? ReactDOM.hydrate : ReactDOM.render;

const root = document.getElementById('app');

const bootstrap = AppComponent => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppComponent />
      </PersistGate>
    </Provider>,
    root
  );
};

bootstrap(App);

if (module.hot) {
  module.hot.accept('./Store', () => {
    ReactDOM.unmountComponentAtNode(root as HTMLElement);
    bootstrap(App);
  });
}
