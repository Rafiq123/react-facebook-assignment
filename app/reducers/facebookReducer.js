import CONSTANTS from '../constants';
const { LOGIN, UPDATE_FB_PROFILE_PICTURE, UPDATE_ALBUMS, UPDATE_ALBUMS_PHOTOS, UPDATE_FB_OBJECT } = CONSTANTS;


const initialState = {
    isLoggedIn: false,
    username: '',
    profilePicture: '',
    albums: [],
    photos: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                username: action.payload.username
            }
        case UPDATE_FB_PROFILE_PICTURE:
            return {
                ...state,
                profilePicture: action.payload
            }
        case UPDATE_ALBUMS:
            return {
                ...state,
                albums: action.payload
            }
        case UPDATE_ALBUMS_PHOTOS:
            return {
                ...state,
                photos: {
                    ...state.photos,
                    [action.payload.id]: action.payload.value
                }
            }
        default:
            return state;
    }
}