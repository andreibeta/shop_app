import {ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAILED} from '../constants/cartConstants';

const reducer = (state = {orders:[]},action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {loading: true};
        case ORDER_DETAILS_SUCCESS:
            return {loading:false, orders: action.payload};
        case ORDER_DETAILS_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
} 

export default reducer;