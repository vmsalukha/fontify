import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import { store, persistor } from './store/fontCardStore';
import AppInitializer from './initializer/AppInitializer';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInitializer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);