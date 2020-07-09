import * as userTypes from '../constants/userConstants';

const reducer = (state = {},action) => {
    switch(action.type){
        case userTypes.EDIT_PROFILE_REQUEST:
            return {loading: true};
        case userTypes.EDIT_PROFILE_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case userTypes.EDIT_PROFILE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;