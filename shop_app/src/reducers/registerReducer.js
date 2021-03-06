import {USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAILED} from '../constants/userConstants';

const reducer = (state = {},action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading:false, response: action.payload,success:true};
        case USER_REGISTER_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;