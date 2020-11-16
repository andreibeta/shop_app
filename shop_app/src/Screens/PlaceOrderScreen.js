import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CheckoutSteps from '../components/CheckoutSteps';
import { placeOrder } from '../actions/cartActionsCreator';

function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    console.log(cart);
    const { cartItems, shipping, payment } = cart;
    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin;  
    //console.log("id user"+userInfo._id);
   
    // if(!shipping.address){
    //     props.history.push("/shipping");
    // }
    // if(!payment.paymentMethod){
    //     props.history.push("/payment");
    // }
    const itemsPrice = cartItems.reduce((acumulator, currentItem) => acumulator+currentItem.price*currentItem.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round((0.15 * itemsPrice)*100)/100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();
    const addressOrder = cart.shipping.address;
    const cityOrder = cart.shipping.city;
    const postalCodeOrder = cart.shipping.postalCode;
    const countryOrder = cart.shipping.country;
    const paymentMethodOrder = cart.payment; 
   

    
    const placeOrderHandler = () => {
        if(userInfo){
        dispatch(placeOrder(addressOrder, cityOrder,postalCodeOrder,countryOrder,paymentMethodOrder,totalPrice,userInfo.email,userInfo._id,userInfo.name));
        setTimeout(function() {
            props.history.push('/');
        }, 2500);
    }else{
        alert("Sign in first");
    }
    }

    const checkoutHandler = () => {
        //props.history.push("/signin?redirect=shipping");
    }
    var getObject= JSON.parse(localStorage.getItem('placeOrderValues'));
    console.log("The object"+getObject);
    useEffect(() => {
       localStorage.setItem('placeOrderValues',JSON.stringify(cart));
       


    },[userInfo]);//[] means that the command will run after the rendering has been done in the CartScreen

    return( 
        <div className="placeOrder">
            <CheckoutSteps className="placeOrder__checkout" step1 step2 step3 step4></CheckoutSteps>
            <div className="placeOrder__info">
                <h3>Shipping</h3>
                <p>Address: {addressOrder}</p>
                <p>City:  {cityOrder}</p>
                <p>Postal Code: {postalCodeOrder}</p>   
                <p>Country: {countryOrder}</p>   
            </div>
            <div className="placeOrder__payment">
                <h3>Payment</h3>
                <p>Payment Method: {paymentMethodOrder}</p>
            </div>
            <ul className="placeOrder__cartList">
                <li>
                    <h3>Shopping Cart</h3>
                </li>
                {
                    cartItems.length === 0 ?
                    <div>
                        Cart is empty
                    </div>
                    :
                    cartItems.map( item => 
                        <li key={item._id}>
                            <div>
                                <img src= {item.image} alt= "product" />
                            </div>
                            
                            <div>
                                    <Link to={"/product/"+ item.product}>
                                        {item.name}
                                    </Link> 
                                <div>
                                    Qty:{item.qty}
                                </div>
                            </div>
                            <div>
                                {item.price}$
                            </div>
                        
                        </li>)
                } 
            </ul>
            <ul className="placeOrder__action">
                <li>
                    <h3>Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>${totalPrice}</div>
                </li>
                <button className="placeOrder__button" onClick={placeOrderHandler}>Place Order</button>
            </ul>
           
        </div>
    )
}

export default PlaceOrderScreen;