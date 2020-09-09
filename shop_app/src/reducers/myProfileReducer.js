import {PROFILE_USER_REQUEST,PROFILE_USER_SUCCESS,PROFILE_USER_FAILED} from '../constants/userConstants';


const reducer = (state = { user: { }},action) => {
    switch(action.type){
        case PROFILE_USER_REQUEST:
            return {loading: true};
        case PROFILE_USER_SUCCESS:
            return {loading:false, user: action.payload};
        case PROFILE_USER_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;