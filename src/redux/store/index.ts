import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../reducers';

const persistConfig = {
  key:'root',
  storage:AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, devToolsEnhancer());
export const persistor = persistStore(store);


