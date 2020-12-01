import {RATING_SUBMIT_REQUEST, RATING_SUBMIT_SUCCESS, RATING_SUBMIT_FAILED} from '../constants/productConstants';

const reducer = (state = {product: {} },action) => {
    switch(action.type){
        case RATING_SUBMIT_REQUEST:
            return {loading: true};
        case RATING_SUBMIT_SUCCESS:
            return {loading:false, success:true, product: action.payload};
        case RATING_SUBMIT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;