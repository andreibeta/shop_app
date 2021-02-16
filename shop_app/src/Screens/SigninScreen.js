import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActionsCreator';
import signinPhoto from '../images/signin.png';
import { useForm } from "react-hook-form";

function SigninScreen(props) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  //const redirect = props.location.search ? props.location.search.split("=")[1]:'/';

  useEffect(() => {
    if (userInfo) {
      //props.history.push("/");
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
  <form id="signin" className="signin" onSubmit={submitHandler}>
    <div className="signin__content">
       <h2 className="signin__content__header">Sign in</h2>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}

        {errors.email && errors.email.type === "required" && <p className="signin__content__labelEmail" style={{color:"red"}}>Email is required</p>}
        {errors.email && errors.email.type === "maxLength" && <p className="signin_content__labelEmail" style={{color:"red"}}>Max length exceeded</p> }
        {!errors.email && <p className="signin__content__labelEmail">Email</p>}
        <input 
            className="signin__content__email" 
            type="email" 
            name="email" 
            placeholder="email"
            id="email" 
            onChange={(e) => setEmail(e.target.value)}
            ref={register({
                required: true,
                minLength:10,
                maxLength:30, 
                pattern: {
                  value:/^\S+@\S+$/i,
                  message:"Invalid Format",
                },
            })}
            style={{borderColor:errors.name && "red"}}
        />

        <p className="signin__content__labelPassword">Password</p>
        <input className="signin__content__password" type="password" id="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)}>
        </input>
        <button type="submit" className="signin__content__submit">Signin</button>
        <div class="signin__content__item signin__content__item--1">
                <img src={signinPhoto} alt="Gallery image 1" class="signin__content__image"></img>
        </div>
        <div className="signin__content__background"></div>
         <p className="signin__content__question">Don't have an account?</p>
         <a href="#" class="signin__close">&times;</a>
        <a className="signin__content__forgot" href="/forgot-password">
            Forgot password?
        </a>
      </div>
  </form>
  )
}
export default SigninScreen;