import {PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_SUCCESS} from '../constants/productConstants';

const reducer = (state = {product: {} },action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product: action.payload};
        case PRODUCT_DETAILS_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;