import CONSTANTS from '../constants';
const { LOGIN, UPDATE_FB_PROFILE_PICTURE, UPDATE_ALBUMS, UPDATE_THUMBNAILS, UPDATE_ALBUMS_PHOTOS } = CONSTANTS;

export const login = (data) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: data
    });
};

export const updateFBProfilePicture = (data) => dispatch => {
    dispatch({
        type: UPDATE_FB_PROFILE_PICTURE,
        payload: data
    });
};

export const updateAlbums = (data) => dispatch => {
    dispatch({
        type: UPDATE_ALBUMS,
        payload: data
    });
};

export const updatePhotos = (data) => dispatch => {
    dispatch({
        type: UPDATE_ALBUMS_PHOTOS,
        payload: data
    });
}


