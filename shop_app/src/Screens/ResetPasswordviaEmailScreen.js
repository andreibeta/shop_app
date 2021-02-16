import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {resetPassword} from '../actions/userActionsCreator';
import {RiLockPasswordFill} from 'react-icons/ri';
import { useForm } from "react-hook-form";

function ResetPasswordviaEmailScreen(props) {
    //to get the specific token id from the link 
    //to pass it further to the reset password procedure
    const resetLink = props.match.params.id;
    const [password,setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const dispatch  = useDispatch();
    const resetpasswordStatus = useSelector(state => state.resetPasswordEmail);
    const {error, response, success} = resetpasswordStatus;

    const { register, handleSubmit, errors, formState,getValues } = useForm({
        mode: "onBlur",
      });
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
      },[response])
      
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(resetLink,password ));
        
    }

    return (
        <form className="resetPassword" onSubmit={submitHandler}>
            <div className="resetPassword__container">
                <h2 className="resetPassword__container__header">Introduce your new password</h2>
                {errors.password && <p style={{color:"red"}}><RiLockPasswordFill className="iconPassword"/>{errors.password.message}</p>}
                {!errors.password}
                <input 
                    className="resetPassword__container__password"
                    type="password"
                    id="password"
                    name="password"  
                    placeholder="new password"
                    onChange={(e) => setPassword(e.target.value)}
                    ref={register({
                        required:"You must specify a password",
                        minLength:{
                          value:8,
                          message:"Password must have at least 8 characters"
                        },
                        maxLength:{
                            value:20,
                            message:"Password must have maximum 20 characters"
                        },
                      })}
                    style={{borderColor:errors.password && "red"}}
                />
                {errors.rePassword && <p style={{color:"red"}}><RiLockPasswordFill className="iconPassword"/>{errors.rePassword.message}</p>}
                        {!errors.rePassword}
                 <input 
                        className="resetPassword__container__repassword"
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
                <button className="resetPassword__container__submit" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default ResetPasswordviaEmailScreen;