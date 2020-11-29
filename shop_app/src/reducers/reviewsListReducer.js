import {REVIEW_DETAILS_REQUEST, REVIEW_DETAILS_SUCCESS, REVIEW_DETAILS_FAILED} from '../constants/productConstants';

const reducer = (state = {reviews:[]},action) => {
    switch(action.type){
        case REVIEW_DETAILS_REQUEST:
            return {loading: true, reviews:[]};
        case REVIEW_DETAILS_SUCCESS:
            return {loading:false, reviews: action.payload};
        case REVIEW_DETAILS_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;