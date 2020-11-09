import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActionsCreator';
import registerPhoto from '../images/register.png';

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [country,setCountry] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1]:'/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    if(password === rePassword){
    e.preventDefault();
    dispatch(register(name,email, password, phoneNumber, country));
    }else{
      e.preventDefault();
      alert("Passwords are not completed the same");
    }
  }
  return (
    <form className="register" onSubmit={submitHandler} >
      <h2 className="register__header">Create an account</h2>
       {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
       
      <label className="register__nameLabel">Name</label>
      <input className="register__name" type="name" name="name" id="name" placeholder="name" onChange={(e) => setName(e.target.value)}></input>
       <label className="register__emailLabel">Email </label>
      <input className="register__email"type="email" name="email" id="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}></input>
      <label className="register__passwordLabel">Password</label>
      <input className="register__password" type="password" id="password" name="password" placeholder="password"onChange={(e) => setPassword(e.target.value)}></input>
      <label className="register__repasswordLabel">Repeat Password</label>
      <input className="register__repassword" type="password" id="rePassword" name="rePassword" placeholder="repeat password" onChange={(e) => setRePassword(e.target.value)}></input>
      <label className="register__phoneLabel">Phone Number</label>
      <input className="register__phone" type="tel" name="phoneNumber" id="phoneNumber" placeholder="phone number" onChange={(e) => setPhoneNumber(e.target.value)}></input>
      <label className="register__countryLabel">Country </label>
      <input className="register__country" type="text" name="country" id="country" placeholder="Country" onChange={(e) => setCountry(e.target.value)}></input>
      <button type="submit" className="register__button">Register</button>
      <div className="register__background"></div>
      <div class="register__item register__item--1">
                <img src={registerPhoto} alt="Gallery image 1" class="register__image"></img>
        </div>
      {/* <p>Already have an account?</p>
      <Link to="/signin">Sign-in</Link>   */}
    </form>
  )
}
export default RegisterScreen;