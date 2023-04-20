import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkerData } from "shared/shareddtypes";

interface MarkersState {
  markers: MarkerData[];
  addPlaceMarker: boolean;
  groupName: string;
  friendGroupName: string;
  friendsMarkers: MarkerData[];
  friendUsername: string;
}

const initialState: MarkersState = {
  markers: [],
  addPlaceMarker: false,
  groupName: "",
  friendGroupName: "",
  friendsMarkers: [],
  friendUsername: "",
};

const markersSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    addMarkers(state, action: PayloadAction<MarkerData[]>) {
      state.markers.push(...action.payload);
    },
    clearMarkers(state) {
      state.markers = [];
      state.groupName = "";
    },
    addPlaceMarker(state, action: PayloadAction<boolean>) {
      state.addPlaceMarker = action.payload;
    },
    clearAddPlaceMarker(state) {
      state.addPlaceMarker = null;
    },
    setGroupMarker(state, action: PayloadAction<string>) {
      state.groupName = action.payload;
    },
    addFriendsMarkers(state, action: PayloadAction<MarkerData[]>) {
      state.friendsMarkers.push(...action.payload);
    },
    clearFriendsMarkers(state) {
      state.friendsMarkers = [];
      state.friendGroupName = "";
      state.friendUsername = "";
    },
    setFriendGroupMarker(state, action: PayloadAction<string>) {
      state.friendGroupName = action.payload;
    },
    setFriendUsername(state, action: PayloadAction<string>) {
      state.friendUsername = action.payload;
    },
  },
});

export const { addMarkers, clearMarkers } = markersSlice.actions;

export default markersSlice.reducer;
