import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Importa tus reducers aquí
import markersReducer from './markersSlice';

const rootReducer = combineReducers({
  // Agrega tus reducers aquí
  markers: markersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
