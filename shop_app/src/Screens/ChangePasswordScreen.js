import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changePassword} from '../actions/userActionsCreator';
import {MdSecurity} from 'react-icons/md';
import {RiLockPasswordFill} from 'react-icons/ri';
function ChangePassword(props) {
    const [password,setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const changedPassword = useSelector(state => state.changedPassword);
    const { loading, users, error } = changedPassword;

    const dispatch = useDispatch();

    const changePasswordHandler = (e) => {
        if(password === rePassword){
        e.preventDefault();
        dispatch(changePassword(password));
        }else{
            alert("Incorrect password");
        }
    }

    return (
        
            <form id="changepassword" className="changepassword" onSubmit={changePasswordHandler}>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                <div className="changepassword__content">
                        <MdSecurity className="icon" />
                        <h3 className="changepassword__content__header">Change password section</h3>
                        <div>
                        <p><RiLockPasswordFill className="iconPassword"/>Password</p>
                        <input type="password" id="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                        </input>
                        </div>
                        <div>
                            <p><RiLockPasswordFill className="iconPassword"/>Repeat Password</p>
                        <input type="password" id="rePassword" name="rePassword" placeholder="repeat password" onChange={(e) => setRePassword(e.target.value)}>
                        </input> 
                        </div> 
                        <button type="submit" className="changepassword__content__button">SUBMIT</button>
                        <a href="#" class="changepassword__close">&times;</a>
                       </div>

            </form>
            
    )
}

export default ChangePassword;