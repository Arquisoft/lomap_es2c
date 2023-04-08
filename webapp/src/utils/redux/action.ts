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
