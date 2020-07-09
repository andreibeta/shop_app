import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActionsCreator';
import HomeScreen from './HomeScreen';

function LogoutScreen(props) {

    const userLogout = useSelector(state => state.userLogout);
    const { loading, userInfo, error } = userLogout;
    const dispatch = useDispatch();

  useEffect(() => {
    //this will list the products
    dispatch(logout());
    return () => {
        
    };
},[])

 
  return (
    loading 
    ? <div>Loading..</div>:
     error 
     ? <div>{error}</div> 
     :  <HomeScreen/> 
  )
  }
export default LogoutScreen;