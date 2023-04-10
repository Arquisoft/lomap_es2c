import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarkerData } from 'shared/shareddtypes';

interface MarkersState {
  markers: MarkerData[];
  addPlaceMarker: boolean;
  groupName: string;
}

const initialState: MarkersState = {
  markers: [],
  addPlaceMarker: false ,
  groupName: "",
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
    }, setGroupMarker(state, action: PayloadAction<string>){
        state.groupName = action.payload;
    }
  },
});

export const { addMarkers, clearMarkers } = markersSlice.actions;

export default markersSlice.reducer;
