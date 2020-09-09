import * as userTypes from '../constants/userConstants';

const reducer = (state = {},action) => {
    switch(action.type){
        case userTypes.CHANGE_PASSWORD_REQUEST:
            return {loading: true};
        case userTypes.CHANGE_PASSWORD_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case userTypes.CHANGE_PASSWORD_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;