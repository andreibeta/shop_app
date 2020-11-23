import React, { useEffect,useState} from 'react';
import {addToCart, removeFromCart} from '../actions/cartActionsCreator';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { saveShipping } from '../actions/cartActionsCreator';
import { savePayment } from '../actions/cartActionsCreator';
import {AiOutlinePlusSquare,AiOutlineMinusSquare} from 'react-icons/ai';
import ShippingScreen from './ShippingScreen';

function CartScreen(props) {
    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;

    const productId = props.match.params.id;
    //const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const qty = props.qty;
    


    //shipping side
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    //payment
    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    const checkoutHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({address,city, postalCode,country}));
        dispatch(savePayment(paymentMethod));
        props.history.push('/placeorder');
    }
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    },[]);//[] means that the command will run after the rendering has been done in the CartScreen

    return( 
       
        <div className="cart" onSubmit={checkoutHandler}>
                    <h2 className="cart__header">
                        Shopping Cart
                    </h2>
                    
                {
                    cartItems.length === 0 ?
                    <div>
                        Cart is empty
                    </div>
                    :
                    cartItems.map( item => 
                        <div className="cart__container" key={item._id}>
                            <div className="cart__container__image">
                                <img src= {item.image} alt= "product" />
                                <h3>{item.name}</h3> 
                            </div>
                            
                            {/* <h3 className="cart__container__name">
                                   {item.name}
                            </h3> */}
                            <div className="details">
                            {/* <h3 className="details__name">
                                   {item.name}
                            </h3> */}
                            <div className="details__size">
                                Size:40
                            </div> 
                            <div className="details__type">
                                Type: Sneakers
                            </div>
                            <div className="details__qty">
                                    <a>Qty: {qty}</a>
                            </div>
                            <div className="details__price">
                                Price:{item.price}$
                            </div>
                            <a className="details__delete" onClick={() => removeFromCartHandler(item.product)} >
                                        Remove Item
                            </a>
                            </div>
                        </div>
                        )
                }
        <div className="cart__action">
            <h3>
                Subtotal ({cartItems.reduce((acumulator,currentItem) => acumulator+currentItem.qty, 0)} items)
                :
                $ {cartItems.reduce((acumulator, currentItem)=> acumulator + currentItem.price * currentItem.qty, 0 )}
            </h3>
            <button type="submit" onClick={checkoutHandler} className="cart__action__checkout" disabled={cartItems.length === 0} >
                Proceed to Checkout
            </button>
           
        </div>
                <form className="cart__shipping">
            
                    <h2 className="cart__shipping__header">Shipping</h2>
                    <div className="cart__shipping__info">
                    <p>Address</p>
                    <input type="text" name="address" id="address" placeholder="Your address" onChange={(e) => setAddress(e.target.value)}></input>
                    </div>
                    <div className="cart__shipping__info">
                        <p>City</p>
                        <input type="text" name="city" id="city" placeholder="City" onChange={(e) => setCity(e.target.value)}></input>
                    </div>
                    <div className="cart__shipping__info">
                        <p>Postal Code</p>
                        <input type="text" name="postalCode" id="postalCode" placeholder="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
                        </input>
                    </div>
                    <div className="cart__shipping__info">
                        <p>Country</p>
                        <input type="text" name="country" placeholder="Country" id="country" onChange={(e) => setCountry(e.target.value)}>
                        </input>
                    </div>
                  
                    
                <div className="cart__shipping__payment">
                    <h2>Payment Type</h2>
                <div className="inputs">
                <div>
                <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" 
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </input>
                    <label htmlFor="paymentMethod">
                        Paypal
                    </label>
                </div>
                <div>
                <input type="radio" name="paymentMethod" id="paymentMethod" value="cash" 
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </input>
                <label htmlFor="paymentMethod">
                        Cash
                </label>
                </div>
                </div>
                </div>
            </form>
           
                
        
    </div>
    )
    
    
}

export default CartScreen;