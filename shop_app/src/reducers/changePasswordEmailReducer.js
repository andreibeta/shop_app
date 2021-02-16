import * as userTypes from '../constants/userConstants';

const reducer = (state = {},action) => {
    switch(action.type){
        case userTypes.USER_RESET_PASSWORD_REQUEST:
            return {loading: true,reset:action.payload};
        case userTypes.USER_RESET_PASSWORD_SUCCESS:
            return {loading:false, response: action.payload, success:true};
        case userTypes.USER_RESET_PASSWORD_FAILED:
            return {loading: false, response: action.payload};
        default:
            return state;
    }
} 

export default reducer;