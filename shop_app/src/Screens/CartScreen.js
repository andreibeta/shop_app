import React, { useEffect } from 'react';
import {addToCart, removeFromCart} from '../actions/cartActionsCreator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function CartScreen(props) {
    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;

    const productId = props.match.params.id;
    //const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const qty = props.qty;
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    const checkoutHandler = () => {
        props.history.push("/shipping");
    }
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    },[]);//[] means that the command will run after the rendering has been done in the CartScreen

    return( 
       
        <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping Cart
                    </h3>
                    <div>
                        Price
                    </div>
                </li>
                {
                    cartItems.length === 0 ?
                    <div>
                        Cart is empty
                    </div>
                    :
                    cartItems.map( item => 
                        <li>
                            <div className="cart-image">
                                <img src= {item.image} alt= "product" />
                            </div>
                            
                            <div className="cart-name">
                                <div>
                                    <Link to={"/product/"+ item.product}>
                                        {item.name}
                                    </Link> 
                                </div>
                                <div>
                                  
                                    {/* <select value={item.qty} onChange={(event)=>dispatch(addToCart(item.product, event.target.value))}>
                                        {[...Array(item.countInStock).keys()].map(x =>
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )}
                                    </select> */}
                                    <a>Qty: {qty}</a>
                                    <button type="button" className="cart-name__delete" onClick={() => removeFromCartHandler(item.product)} >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="cart-price">
                                {item.price}$
                            </div>
                        
                        </li>)
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ({cartItems.reduce((acumulator,currentItem) => acumulator+currentItem.qty, 0)} items)
                :
                $ {cartItems.reduce((acumulator, currentItem)=> acumulator + currentItem.price * currentItem.qty, 0 )}
            </h3>
            <button onClick={checkoutHandler} className="cart-action__checkout" disabled={cartItems.length === 0} >
                Proceed to Checkout
            </button>
           
        </div>
    </div>
    )
    
    
}

export default CartScreen;