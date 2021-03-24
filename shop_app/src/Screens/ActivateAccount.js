import React, { useEffect,useState } from 'react';
import {activateUser} from "../actions/userActionsCreator";
import {useDispatch} from 'react-redux';

function ActivateAccount(props) {
    const activateLink = props.match.params.id;
    const dispatch = useDispatch();
    const activateHandler = () => {
        dispatch(activateUser(activateLink));
    }
    return (
        <button onClick={activateHandler} >Click here to activate!</button>
    )
}

export default ActivateAccount;