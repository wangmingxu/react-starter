import './common';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './Store';

const render = __ISOMORPHIC__ ? ReactDOM.hydrate : ReactDOM.render;

const root = document.getElementById('app');

const bootstrap = AppComponent => {
  render(
    <Provider store={store}>
      <AppComponent />
    </Provider>,
    root
  );
};

bootstrap(App);

if (module.hot) {
  module.hot.accept('./Store', () => {
    ReactDOM.unmountComponentAtNode(root);
    bootstrap(App);
  });
}
