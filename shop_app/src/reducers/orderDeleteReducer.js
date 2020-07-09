import {ORDER_DELETE_REQUEST, ORDER_DELETE_FAILED, ORDER_DELETE_SUCCESS} from '../constants/userConstants';

const reducer = (state = {product: {} },action) => {
    switch(action.type){
        case ORDER_DELETE_REQUEST:
            return {loading: true};
        case ORDER_DELETE_SUCCESS:
            return {loading:false, product: action.payload, success: true};
        case ORDER_DELETE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;