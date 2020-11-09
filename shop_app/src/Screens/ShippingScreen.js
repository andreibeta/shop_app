import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActionsCreator';
import CheckoutSteps from '../components/CheckoutSteps';
function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({address,city, postalCode,country}));
    props.history.push('/payment');

  }
  return (
    <form className="shipping" onSubmit={submitHandler} >
      <CheckoutSteps step1 step2></CheckoutSteps>
      <h2 className="shipping__header">Shipping</h2>
      <div className="shipping__address">
      <p>Address</p>
      <input type="text" name="address" id="address" placeholder="Your address" onChange={(e) => setAddress(e.target.value)}></input>
      </div>
      <div className="shipping__city">
        <p>City</p>
        <input type="text" name="city" id="city" placeholder="City" onChange={(e) => setCity(e.target.value)}></input>
      </div>
      <div className="shipping__postal">
        <p>Postal Code</p>
        <input type="text" name="postalCode" id="postalCode" placeholder="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
          </input>
      </div>
      <div className="shipping__country">
        <p>Country</p>
        <input type="text" name="country" placeholder="Country" id="country" onChange={(e) => setCountry(e.target.value)}>
          </input>
      </div>
      <button type="submit" className="shipping__submit">Continue</button>
      
    </form>
  )
}
export default ShippingScreen;