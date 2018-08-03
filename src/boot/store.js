/* @flow */
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import type { Config } from 'redux-persist';

import config from '../config';
import rootReducer from './reducers';
import middleware from './middleware';
import ZulipAsyncStorage from './ZulipAsyncStorage';

// AsyncStorage.clear(); // use to reset storage during development

const store = compose(applyMiddleware(...middleware), autoRehydrate())(createStore)(rootReducer);

const reduxPersistConfig: Config = {
  whitelist: [...config.storeKeys, ...config.cacheKeys],
  // $FlowFixMe: https://github.com/rt2zz/redux-persist/issues/823
  storage: ZulipAsyncStorage,
};

export const restore = (onFinished?: () => void) =>
  persistStore(store, reduxPersistConfig, onFinished);

export default store;
