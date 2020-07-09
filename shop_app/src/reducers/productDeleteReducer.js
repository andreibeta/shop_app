import {PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAILED, PRODUCT_DELETE_SUCCESS} from '../constants/productConstants';

const reducer = (state = {product: {} },action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading: true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, product: action.payload, success: true};
        case PRODUCT_DELETE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;