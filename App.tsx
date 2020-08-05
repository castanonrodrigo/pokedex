import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import MyApp from './src/routes';
import {ActivityIndicator} from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <MyApp/>
      </PersistGate>
    </Provider>
    );
}

