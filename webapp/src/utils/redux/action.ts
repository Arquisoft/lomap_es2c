import { MarkerData } from "shared/shareddtypes";


export interface AddMarkersAction {
  type: 'markers/addMarkers';
  payload: MarkerData[];
}

export const addMarkers = (markers: MarkerData[]): AddMarkersAction => ({
  type: 'markers/addMarkers',
  payload: markers,
});

interface ClearMarkersAction {
  type: 'markers/clearMarkers';
}

export const clearMarkers = (): ClearMarkersAction => ({
  type: 'markers/clearMarkers',
});

interface AddPlaceMarkerAction {
  type: 'markers/addPlaceMarker';
  payload: boolean;
}

export const addPlaceMarker = (show: boolean): AddPlaceMarkerAction => ({
  type: 'markers/addPlaceMarker',
  payload: show,
});

interface ClearAddPlaceMarkerAction {
  type: 'markers/clearAddPlaceMarker';
}

export const clearAddPlaceMarker = (): ClearAddPlaceMarkerAction => ({
  type: 'markers/clearAddPlaceMarker'
});

interface SetGroupMarker {
  type: 'markers/setGroupMarker';
  payload: string;
}

export const setGroupMarker = (groupName: string): SetGroupMarker => ({
  type: 'markers/setGroupMarker', 
  payload: groupName,
});