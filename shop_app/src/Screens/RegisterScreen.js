import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../actions/userActionsCreator';
import registerPhoto from '../images/register.png';
import { useForm } from "react-hook-form";


function RegisterScreen(props) {
  const { register, handleSubmit, errors, formState,getValues } = useForm({
    mode: "onBlur",
  });
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
     
    
    return () => {
      //
    };
  }, []);

  const submitHandler = (e) => {
    //e.preventDefault();
    if(password === rePassword){
    dispatch(registerUser(name,email, password, phoneNumber, country));
    props.history.push(redirect);
    alert("Account created");
    }else{
      alert("Passwords are not completed the same");
    }
  }
  return (
    <form className="register" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="register__header">Create an account</h2>
       {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
       
      {errors.name && errors.name.type === "required" && <label className="register__nameLabel" style={{color:"red"}}>Name is required</label>}
      {errors.name && errors.name.type === "maxLength" && <label className="register__nameLabel" style={{color:"red"}}>Max length exceeded</label> }
      {!errors.name && <label className="register__nameLabel">Name</label>}
      <input 
          className="register__name" 
          type="text" 
          name="name" 
          id="name" 
          placeholder="name" 
          onChange={(e) => setName(e.target.value)}
          ref={register({
            required:true,
            minLength:6,
            maxLength:20,
          })}
        style={{borderColor:errors.name && "red"}}
      />


      {errors.email && errors.email.type === "required" && <label className="register__emailLabel" style={{color:"red"}}>Email is required</label>}
      {errors.email && errors.email.type === "maxLength" && <label className="register__emailLabel" style={{color:"red"}}>Max length exceeded</label> }
      {!errors.email && <label className="register__emailLabel">Email</label>}
      <input 
          type="text" 
          className="register__email" 
          placeholder="Email" 
          name="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          ref={register({
            required: true,
            minLength:10,
            maxLength:30, 
            pattern: /^\S+@\S+$/i
          })} 
          style={{borderColor:errors.email && "red"}}
      />


      {errors.password && <label className="register__passwordLabel" style={{color:"red"}}>{errors.password.message}</label>}
      {!errors.password && <label className="register__passwordLabel">Password</label>}
      <input 
          className="register__password" 
          type="password" 
          id="password" 
          name="password" 
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          ref={register({
            required:"You must specify a password",
            minLength:{
              value:8,
              message:"Password must have at least 8 characters"
            },
            maxLength:20,
          })}
      style={{borderColor:errors.password && "red"}}
      />


      {errors.rePassword && <label className="register__repasswordLabel" style={{color:"red"}}>{errors.rePassword.message}</label>}
      {!errors.rePassword && <label className="register__repasswordLabel">Repeat Password</label>}
      <input 
          className="register__repassword" 
          type="password" 
          id="rePassword" 
          name="rePassword" 
          placeholder="repeat password" 
          onChange={(e) => setRePassword(e.target.value)}
          ref={register({
            validate: value => {
              if (value === getValues()["password"]) {
                return true;
              } else {
                return "The passwords do not match";
              }
            }
          })}
      style={{borderColor:errors.rePassword && "red"}}
      />

      
      {errors.phoneNumber && <label className="register__phoneLabel" style={{color:"red"}}>{errors.phoneNumber.message}</label>}
      {!errors.phoneNumber && <label className="register__phoneLabel">Phone Number</label>}
      <input 
          className="register__phone" 
          type="tel" 
          name="phoneNumber" 
          id="phoneNumber" 
          placeholder="phone number" 
          onChange={(e) => setPhoneNumber(e.target.value)}
          pattern="[0-9]*"
          ref={register({
            required: "You must specify a phone number",
            minLength:{
              value:6,
              message:"Phone number must have minimum 6 digits"
            }, 
            maxLength:{
              value:12,
              message:"Phone number must have maximum 12 digits"
            }
          })}
          style={{borderColor:errors.rePassword && "red"}}
      />


      {errors.country && <label className="register__countryLabel" style={{color:"red"}}>{errors.country.message}</label>}
      {!errors.country && <label className="register__countryLabel">Country</label>}
      <input 
      className="register__country" 
      type="text" 
      name="country" 
      id="country" 
      placeholder="Country" 
      onChange={(e) => setCountry(e.target.value)}
      ref={register({
        required: "You must specify a Country",
        minLength:{
          value:4,
          message:"Minimum length is 4"
        }, 
        maxLength:{
          value:20,
          message:"Maximum length is 20"
        },
      })}
      style={{borderColor:errors.rePassword && "red"}}
      />
      <button type="submit" className="register__button" disabled={formState.isSubmiting}>Register</button>
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