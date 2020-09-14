import {REVIEW_DELETE_REQUEST, REVIEW_DELETE_SUCCESS, REVIEW_DELETE_FAILED} from '../constants/productConstants';

const reducer = (state = {},action) => {
    switch(action.type){
        case REVIEW_DELETE_REQUEST:
            return {loading: true};
        case REVIEW_DELETE_SUCCESS:
            return {loading:false, review: action.payload, success: true};
        case REVIEW_DELETE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;