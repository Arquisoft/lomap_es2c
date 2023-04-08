import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import L from 'leaflet';
import { MarkerData } from 'shared/shareddtypes';

interface MarkersState {
  markers: MarkerData[];
  addPlaceMarker: boolean;
}

const initialState: MarkersState = {
  markers: [],
  addPlaceMarker: false ,
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
    }, addPlaceMarker(state, action: PayloadAction<boolean>){
      state.addPlaceMarker = action.payload;
    },
    clearAddPlaceMarker(state) {
      state.addPlaceMarker = null;
    }
  },
});

export const { addMarkers, clearMarkers } = markersSlice.actions;

export default markersSlice.reducer;
