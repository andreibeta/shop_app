import {USERS_LIST_REQUEST,USERS_LIST_SUCCESS,USERS_LIST_FAILED} from '../constants/userConstants';


const reducer = (state = {users:[]},action) => {
    switch(action.type){
        case USERS_LIST_REQUEST:
            return {loading: true};
        case USERS_LIST_SUCCESS:
            return {loading:false, users: action.payload};
        case USERS_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;