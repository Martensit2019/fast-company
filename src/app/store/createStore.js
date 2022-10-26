// import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";

import qualitiesReducer from "./qualities";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({ qualities: qualitiesReducer });

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
