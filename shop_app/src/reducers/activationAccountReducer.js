import {USER_ACTIVATION_REQUEST, USER_ACTIVATION_SUCCESS, USER_ACTIVATION_FAILED} from '../constants/userConstants';

const reducer = (state = {},action) => {
    switch(action.type){
        case USER_ACTIVATION_REQUEST:
            return {loading: true};
        case USER_ACTIVATION_SUCCESS:
            return {loading:false, response: action.payload,success:true};
        case USER_ACTIVATION_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;