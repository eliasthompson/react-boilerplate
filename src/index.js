import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
import Container from './components/layout/Container';

render(
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
      <BrowserRouter basename="/">
        <Container />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) module.hot.accept();
