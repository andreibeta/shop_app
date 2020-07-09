import * as cartTypes from '../constants/cartConstants';

const reducer = (state = {},action) => {
    switch(action.type){
        case cartTypes.CART_PLACE_ORDER_REQUEST:
            return {loading: true};
        case cartTypes.CART_PLACE_ORDER_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case cartTypes.CART_PLACE_ORDER_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;