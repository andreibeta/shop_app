import Axios from "axios";
import Cookie from 'js-cookie';
import * as cartTypes from "../constants/cartConstants";

const addToCart = (productId,qty) => async (dispatch, getState) => {
    try{
        const {data} = await Axios.get("/api/products/" + productId);
        dispatch({
            type:cartTypes.ADD_TO_CART, payload:{
            product: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }});
        const {cart:{cartItems}} = getState();
        Cookie.set("cartItems",JSON.stringify(cartItems));
    }catch(error){

    }
}

const removeFromCart  = (productId) => (dispatch, getState) => {
    dispatch({type:cartTypes.CART_REMOVE_ITEM, payload:productId});

    const {cart:{cartItems}} = getState();
        Cookie.set("cartItems",JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
    dispatch({type:cartTypes.CART_SAVE_SHIPPING, payload:data});
}

const savePayment = (data) => (dispatch) => {
    dispatch({type:cartTypes.CART_SAVE_PAYMENT, payload:data});
}
const placeOrder = (addressOrder, cityOrder,postalCodeOrder,countryOrder,paymentMethodOrder,totalPrice,email,quantity) => async(dispatch) => {
    dispatch({type:cartTypes.CART_PLACE_ORDER_REQUEST, payload:{ addressOrder, cityOrder,postalCodeOrder,countryOrder,paymentMethodOrder,totalPrice,email,quantity}});
    try {
        const { data } = await Axios.post("/api/orders", {addressOrder, cityOrder,postalCodeOrder,countryOrder,paymentMethodOrder,totalPrice,email});
        dispatch({ type: cartTypes.CART_PLACE_ORDER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
        alert("The order has been successfully made");
      } catch (error) {
        dispatch({ type: cartTypes.CART_PLACE_ORDER_FAILED, payload: error.message });
        alert("Something went wrong")
      }
}
const myOrders = () => async (dispatch,getState) => {
    
    try{
        dispatch({type: cartTypes.ORDER_DETAILS_REQUEST});
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.get("/api/orders", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
          
        dispatch({type: cartTypes.ORDER_DETAILS_SUCCESS, payload: data});
        }catch(error){
        dispatch({type: cartTypes.ORDER_DETAILS_FAILED, payload: error.message})
    }
}

export {addToCart, removeFromCart, saveShipping, savePayment,placeOrder,myOrders};