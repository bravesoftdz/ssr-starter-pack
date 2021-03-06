import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { initializeServerSideHeaders } from 'src/utils/EnvUtils';

import * as Bundles from './components/Bundles';
import App from './App';

const doRender = () => {
  hydrate(
    <AppContainer warnings={false}>
      <App type="client" />
    </AppContainer>,
    document.getElementById('content'),
  );
};

const serverSideHeaders = window.serverSideHeaders || {};
initializeServerSideHeaders(serverSideHeaders);

const splitPoints = window.splitPoints || [];
Promise.all(splitPoints.map(chunk => Bundles[chunk].loadComponent()))
  .then(doRender);

if (module.hot) {
  module.hot.accept('./App', doRender);
}
