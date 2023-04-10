import { MarkerData } from "shared/shareddtypes";
import { AddMarkersAction } from './action'

interface MarkerState {
    markers: MarkerData[];
  }
  
  const initialState: MarkerState = {
    markers: [],
  };
  
  type MarkerAction = AddMarkersAction;
  
  const markerReducer = (state = initialState, action: MarkerAction): MarkerState => {
    switch (action.type) {
      case 'markers/addMarkers':
        return { ...state, markers: [...state.markers, ...action.payload] };
      default:
        return state;
    }
  };
  
  export default markerReducer;
  