import React, { useEffect,useState} from 'react';
import {addToCart, removeFromCart} from '../actions/cartActionsCreator';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { saveShipping } from '../actions/cartActionsCreator';
import { savePayment } from '../actions/cartActionsCreator';
import {AiOutlinePlusSquare,AiOutlineMinusSquare} from 'react-icons/ai';
import ShippingScreen from './ShippingScreen';
import { useForm } from "react-hook-form";

var styles = {border:"1px solid red"};

function CartScreen(props) {
    const { register, handleSubmit, errors, formState } = useForm({
        mode: "onBlur",
      });
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
        //e.preventDefault();
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
       
        <form className="cart" onSubmit={handleSubmit(checkoutHandler)}>
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
                            <div className="details">
                            
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
            {/* <button type="submit" onClick={checkoutHandler} className="cart__action__checkout" disabled={cartItems.length === 0 || address ==='' || city === '' || postalCode === '' || country ==='' || paymentMethod ===''} >
                Proceed to Checkout
            </button> */}
             <button type="submit" disabled={formState.isSubmiting} >
                Proceed to Checkout
            </button>
           
        </div>
                <div className="cart__shipping">
            
                    <h2 className="cart__shipping__header">Shipping</h2>
                    <div className="cart__shipping__info">
                    <p>Address</p>
                    {errors.address && errors.address.type === "required" && <p style={{color:"red"}}>This is required</p>}
                    {errors.address && errors.address.type === "maxLength" && <p style={{color:"red"}}>Max length exceeded</p> }
                    <input 
                        type="text" 
                        name="address" 
                        id="address" 
                        placeholder="Your address" 
                        onChange={(e) => setAddress(e.target.value)}
                        ref={register({
                            required:true,
                            minLength:6,
                            maxLength:20,
                        })}
                        style={{borderColor:errors.address && "red"}}
                        >
                        </input>
                    </div>
                    <div className="cart__shipping__info">
                        <p>City</p>
                        {errors.city && errors.city.type === "required" && <p style={{color:"red"}}>This is required</p>}
                        {errors.city && errors.city.type === "maxLength" && <p style={{color:"red"}}>Max length exceeded</p> }
                        <input 
                            type="text" 
                            name="city" 
                            id="city" 
                            placeholder="City" 
                            onChange={(e) => setCity(e.target.value)}
                            ref={register({
                                required:true,
                                minLength:4,
                                maxLength:20,
                            })}
                            style={{borderColor:errors.city && "red"}}
                            >
                        </input>
                    </div>
                    <div className="cart__shipping__info">
                        <p>Postal Code</p>
                        {errors.postalCode && errors.postalCode.type === "required" && <p style={{color:"red"}}>This is required</p>}
                        {errors.postalCode && errors.postalCode.type === "maxLength" && <p style={{color:"red"}}>Max length exceeded</p> }
                        <input 
                            type="text"
                            pattern="[0-9]*" 
                            name="postalCode" 
                            id="postalCode" 
                            placeholder="postalCode" 
                            onChange={(e) => setPostalCode(e.target.value)}
                            ref={register({
                                required:true,
                                minLength:5,
                                maxLength:7,
                            })}
                            style={{borderColor:errors.city && "red"}}
                            >
                        </input>
                    </div>
                    <div className="cart__shipping__info">
                        <p>Country</p>
                        {errors.country && errors.country.type === "required" && <p style={{color:"red"}}>This is required</p>}
                        {errors.country && errors.country.type === "maxLength" && <p style={{color:"red"}}>Max length exceeded</p> }
                        <input  
                                type="text" 
                                name="country" 
                                placeholder="Country" 
                                id="country" 
                                onChange={(e) => setCountry(e.target.value)}
                                ref={register({
                                    required:true,
                                    minLength:5,
                                    maxLength:15,
                                })}
                                style={{borderColor:errors.city && "red"}}
                                >
                        </input>
                    </div>
                  
                    
                <div className="cart__shipping__payment">
                    <h2>Payment Type</h2>
                    
                <div className="inputs">
                <div>
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        id="paymentMethod" 
                        value="paypal" 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ref={register({
                            required:true,
                        })}
                        >
                    </input>
                    <label htmlFor="paymentMethod">
                        Paypal
                    </label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        id="paymentMethod" value="cash" 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ref={register({
                            required:true,
                        })}
                        >
                    </input>
                <label htmlFor="paymentMethod">
                        Cash
                </label>
                </div>
                <div className="inputs__error">
                {errors.paymentMethod && errors.paymentMethod.type === "required" && <p style={{color:"red"}}>This is required</p>}
                </div>
                </div>
                </div>
            </div>
           
                
        
    </form>
    )
    
    
}

export default CartScreen;