import { combineReducers } from 'redux';

import facebookReducer from './facebookReducer';

export default combineReducers({
    facebook : facebookReducer
});