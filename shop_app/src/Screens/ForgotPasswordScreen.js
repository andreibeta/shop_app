import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {forgotPassword} from '../actions/userActionsCreator';
import {MdEmail} from 'react-icons/md';

function ForgotPasswordScreen(props) {
    const [email,setEmail] = useState('');
    const forgotPasswordStatus = useSelector(state => state.forgotPassword);
    const {loading,response, success} = forgotPasswordStatus;
    const dispatch = useDispatch();
   
    
    useEffect(() => {
      if(response){
        console.log("RESPONSE:",response);
        alert(response);
        if(success){
          setTimeout(()=>{
            props.history.push('/');
          },500) 
        } 
      }
      
        return () => {
          
          
        };
      }, [response]);
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(forgotPassword(email));
        
    }
    
      return (
          
          <form className="forgotPassword" onSubmit={submitHandler}>
            <div className="forgotPassword__container">
           
              <h2 className="forgotPassword__container__header">Introduce your email </h2>
              <MdEmail className="icon"/>
              <input
              type="text"
              className="forgotPassword__container__email"
              placeholder="Email"
              onChange = {(e) => setEmail(e.target.value)}
              >
              </input>
              <button className="forgotPassword__container__button" type="submit">Submit</button>
              <p className="forgotPassword__container__description">Introduce your account email and after the validation an automatic email will be sent in the next few minutes!</p>
              </div>
          </form>

      )

}

export default ForgotPasswordScreen;



