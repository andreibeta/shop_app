import {PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_FAILED, PRODUCT_SAVE_SUCCESS} from '../constants/productConstants';

const reducer = (state = {product: {} },action) => {
    switch(action.type){
        case PRODUCT_SAVE_REQUEST:
            return {loading: true};
        case PRODUCT_SAVE_SUCCESS:
            return {loading:false, success:true, product: action.payload};
        case PRODUCT_SAVE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;