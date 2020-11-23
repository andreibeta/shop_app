import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActionsCreator';
import CheckoutSteps from '../components/CheckoutSteps';
function PaymentScreen(props) {

  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();


  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(savePayment(paymentMethod));
  //   props.history.push('placeorder');
  // }
  return(
      <form className="payment">
      {/* <CheckoutSteps step1 step2 step3></CheckoutSteps> */}
      <h2 className="payment__header">Payment</h2>
      <div className="payment__type">
      <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" 
            onChange={(e) => setPaymentMethod(e.target.value)}>
          </input>
          <label htmlFor="paymentMethod">
            Paypal
          </label>
      </div>
      {/* <button type="submit" className="payment__submit">Continue</button> */}
    </form>
  )
  
}
export default PaymentScreen;