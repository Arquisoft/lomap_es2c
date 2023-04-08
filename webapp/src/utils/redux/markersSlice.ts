import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarkerData } from 'shared/shareddtypes';

interface MarkersState {
  markers: MarkerData[];
}

const initialState: MarkersState = {
  markers: [],
};

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    addMarkers(state, action: PayloadAction<MarkerData[]>) {
      state.markers.push(...action.payload);
    },
    clearMarkers(state) {
      state.markers = [];
    },
  },
});

export const { addMarkers, clearMarkers } = markersSlice.actions;

export default markersSlice.reducer;
