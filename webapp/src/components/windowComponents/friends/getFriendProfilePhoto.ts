import PodManager from "podManager/PodManager";

export const getFriendProfilePhoto = (selectedUserWebID: string) => {
    return new PodManager().getPhoto(selectedUserWebID).then((url) => {
        return url;
    });
};