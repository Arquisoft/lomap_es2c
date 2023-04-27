import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import markersReducer from "./markersSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  markers: markersReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
