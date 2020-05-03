import React from "react"
import App from "../components/App.js"
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import userInfo from '../components/login/reducers'
import categoriesInfo from '../components/categories/reducers'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react';
import { persistReducer, persistStore } from 'redux-persist';
import localforage from 'localforage';

import { modelsState, downloadState } from '../components/common/reducers'

const middlewares = [thunk];

const rootReducer = combineReducers({
  userInfo,
  categoriesInfo,
  modelsState,
  downloadState,
})

const store = createReduxStore(middlewares);
const persistor = persistStore(store);

const IndexPage = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

function createReduxStore(middlewaresArray) {
  const config = {
    key: 'root',
    storage: localforage,
    stateReconciler: autoMergeLevel2,
  };
  const rootReducerWithPersist = persistReducer(config, rootReducer);

  return createStore(
    rootReducerWithPersist,
    applyMiddleware(...middlewaresArray),
  );
}

export default IndexPage
