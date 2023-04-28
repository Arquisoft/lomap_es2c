import { MarkerData } from "shared/shareddtypes";

// Functionality related to updating the map
export interface AddMarkersAction {
  type: "markers/addMarkers";
  payload: MarkerData[];
}

export const addMarkers = (markers: MarkerData[]): AddMarkersAction => ({
  type: "markers/addMarkers",
  payload: markers,
});

interface ClearMarkersAction {
  type: "markers/clearMarkers";
}

export const clearMarkers = (): ClearMarkersAction => ({
  type: "markers/clearMarkers",
});

interface AddPlaceMarkerAction {
  type: "markers/addPlaceMarker";
  payload: boolean;
}

export const addPlaceMarker = (show: boolean): AddPlaceMarkerAction => ({
  type: "markers/addPlaceMarker",
  payload: show,
});

interface ClearAddPlaceMarkerAction {
  type: "markers/clearAddPlaceMarker";
}

export const clearAddPlaceMarker = (): ClearAddPlaceMarkerAction => ({
  type: "markers/clearAddPlaceMarker",
});

interface SetGroupMarker {
  type: "markers/setGroupMarker";
  payload: string;
}

export const setGroupMarker = (groupName: string): SetGroupMarker => ({
  type: "markers/setGroupMarker",
  payload: groupName,
});

interface SetFriendGroupMarker {
  type: "markers/setFriendGroupMarker";
  payload: string;
}

export const setFriendGroupMarker = (
  friendGroupName: string
): SetFriendGroupMarker => ({
  type: "markers/setFriendGroupMarker",
  payload: friendGroupName,
});

interface ClearFriendsMarkersAction {
  type: "markers/clearFriendsMarkers";
}

export const clearFriendsMarkers = (): ClearFriendsMarkersAction => ({
  type: "markers/clearFriendsMarkers",
});

export interface AddFriendsMarkersAction {
  type: "markers/addFriendsMarkers";
  payload: MarkerData[];
}

export const addFriendsMarkers = (
  friendsMarkers: MarkerData[]
): AddFriendsMarkersAction => ({
  type: "markers/addFriendsMarkers",
  payload: friendsMarkers,
});

interface SetFriendUsername {
  type: "markers/setFriendUsername";
  payload: string;
}

export const setFriendUsername = (
  friendUsername: string
): SetFriendUsername => ({
  type: "markers/setFriendUsername",
  payload: friendUsername,
});

interface SetFilterForMyMarkers {
  type: "markers/setFilterForMyMarkers";
  payload: string[];
}

export const setFilterForMyMarkers = (
  myFilters: string[]
): SetFilterForMyMarkers => ({
  type: "markers/setFilterForMyMarkers",
  payload: myFilters,
});

interface ClearFilterForMyMarkers {
  type: "markers/clearFilterForMyMarkers";
}

export const clearFilterForMyMarkers = (): ClearFilterForMyMarkers => ({
  type: "markers/clearFilterForMyMarkers",
});

interface SetFilterForFriendMarkers {
  type: "markers/setFilterForFriendMarkers";
  payload: string[];
}

export const setFilterForFriendMarkers = (
  friendsFilters: string[]
): SetFilterForFriendMarkers => ({
  type: "markers/setFilterForFriendMarkers",
  payload: friendsFilters,
});

interface ClearFilterForFriendMarkers {
  type: "markers/clearFilterForFriendMarkers";
}

export const clearFilterForFriendMarkers = (): ClearFilterForFriendMarkers => ({
  type: "markers/clearFilterForFriendMarkers",
});

// Functionality related to the user

interface SetProfileImage {
  type: "user/setProfileImage";
  payload: string;
}

export const setProfileImage = (
  imgUrl: string
): SetProfileImage => ({
  type: "user/setProfileImage",
  payload: imgUrl,
});

// Functionality related to the app
interface SetLastPath {
  type: "app/setLastPath";
  payload: string;
}

export const setLastPath = (
  lastPath: string
): SetLastPath => ({
  type: "app/setLastPath",
  payload: lastPath,
});