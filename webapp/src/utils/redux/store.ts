import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import markersReducer from "./markersSlice";

const rootReducer = combineReducers({
  markers: markersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
