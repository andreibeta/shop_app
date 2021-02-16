import {USER_FORGOT_REQUEST,USER_FORGOT_SUCCESS,USER_FORGOT_FAILED} from '../constants/userConstants';

const reducer = (state = {},action) => {
    switch(action.type){
        case USER_FORGOT_REQUEST:
            return {loading: true};
        case USER_FORGOT_SUCCESS:
            return {loading:false, response: action.payload, success:true};
        case USER_FORGOT_FAILED:
            return {loading: false, response: action.payload, success:false};
        default:
            return state;
    }
} 

export default reducer;