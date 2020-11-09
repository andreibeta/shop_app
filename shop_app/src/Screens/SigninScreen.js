import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActionsCreator';
import signinPhoto from '../images/signin.png';


function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1]:'/';

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

  }
  return(
  <form className="signin" onSubmit={submitHandler}>
       <h2 className="signin__header">Sign in</h2>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <p className="signin__labelEmail">Email</p>
        <input className="signin__email" type="email" name="email" placeholder="email"id="email" onChange={(e) => setEmail(e.target.value)}>
        </input>
        <p className="signin__labelPassword">Password</p>
        <input className="signin__password" type="password" id="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)}>
        </input>
        <button type="submit" className="signin__submit">Signin</button>
        <div class="signin__item signin__item--1">
                <img src={signinPhoto} alt="Gallery image 1" class="signin__image"></img>
        </div>
        <div className="signin__background"></div>
         <p className="signin__question">Don't have an account?</p>
        <Link className="signin__registerPath" to={redirect === '/' ? "register" : "register?redirect="+redirect}>
            Register here
        </Link>
        
  </form>
  )
}
export default SigninScreen;