import {USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAILED} from '../constants/userConstants';

const reducer = (state = {},action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading: true};
        case USER_DELETE_SUCCESS:
            return {loading:false, review: action.payload, success: true};
        case USER_DELETE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;