import * as cartTypes from "../constants/cartConstants";

const reducer = (state = {cartItems:[],shipping:[], payment:[]},action) => {
    switch(action.type){
        case cartTypes.ADD_TO_CART:
            const item = action.payload;
            const product = state.cartItems.find(i => i.product === item.product);
            if(product){
                //i keep the previous state and i update the cart items
                return {
                ...state,
                cartItems: state.cartItems.map(i=>i.product === product.product ? item : i)
                }
            }
            return {...state,cartItems:[...state.cartItems, item]};
        case cartTypes.CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x=>x.product !== action.payload)};
        case cartTypes.CART_SAVE_SHIPPING:
            //return a new state
            return {...state, shipping: action.payload};
        case cartTypes.CART_SAVE_PAYMENT:
            return {...state, payment: action.payload};
            default:
                return state;
    }
}
export default reducer;