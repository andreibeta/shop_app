import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changePassword} from '../actions/userActionsCreator';


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
        <div className="form">
            <form onSubmit={changePasswordHandler}>
                <ul className="form-container">
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                        </input>
                        </li>
                        <li>
                        <label htmlFor="rePassword">Repeat Password</label>
                        <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
                        </input>
                        </li>
                        <button type="submit" className="button primary">SUBMIT</button>
                </ul>
            </form>
        </div>
    )
}

export default ChangePassword;