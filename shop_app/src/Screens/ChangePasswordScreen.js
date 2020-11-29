import React, { useEffect,useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changePassword} from '../actions/userActionsCreator';
import {MdSecurity} from 'react-icons/md';
import {RiLockPasswordFill} from 'react-icons/ri';
import { useForm } from "react-hook-form";

function ChangePassword(props) {
    const { register, handleSubmit, errors, formState,getValues } = useForm({
        mode: "onBlur",
      });
    const [password,setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const changedPassword = useSelector(state => state.changedPassword);
    const { loading, users, error } = changedPassword;
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    //setModalVisible(true);
    useEffect(() => {
      if (userInfo) {
        //props.history.push("/");
      }
      return () => {
        //
      };
    }, [userInfo]);
    const changePasswordHandler = (e) => {
        if(password === rePassword){
        dispatch(changePassword(password));
        setTimeout(function() {
              window.location.href="#";
          }, 1000);
        }else{
            alert("Incorrect password");
        }
    }
    return (
        
            <form id="changepassword" className="changepassword" onSubmit={handleSubmit(changePasswordHandler)}>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                <div className="changepassword__content">
                        <MdSecurity className="icon" />
                        <h3 className="changepassword__content__header">Change password section</h3>
                        <div>
                        {errors.password && <p style={{color:"red"}}><RiLockPasswordFill className="iconPassword"/>{errors.password.message}</p>}
                        {!errors.password && <p><RiLockPasswordFill className="iconPassword"/>Password</p>}
                        <input 
                        type="password" 
                        id="password" 
                        placeholder="password" 
                        name="password" 
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
                        </div>
                        <div>

                        {errors.rePassword && <p style={{color:"red"}}><RiLockPasswordFill className="iconPassword"/>{errors.rePassword.message}</p>}
                        {!errors.rePassword && <p><RiLockPasswordFill className="iconPassword"/>Repeat Password</p>}
                        <input 
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
                        </div> 
                        <button type="submit" className="changepassword__content__button" disabled={formState.isSubmiting}>SUBMIT</button>
                        <a href="#" class="changepassword__close">&times;</a>
                       </div>
                
            </form>
            
    )
}

export default ChangePassword;