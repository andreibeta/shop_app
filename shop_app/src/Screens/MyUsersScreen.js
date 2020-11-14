import React, { useEffect, useState } from 'react';
import { myListOfUsers } from '../actions/userActionsCreator';
import {useSelector, useDispatch} from 'react-redux';



function MyUsersScreen(props) {
   
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userList = useSelector(state => state.userList);
    const {users, loading, error} = userList;
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(myListOfUsers());
        return () => {
            dispatch(myListOfUsers());
        };
    },[])

   

    return (
      loading 
      ? <div> Loading...</div>
      : error ? <div>{error}</div> 
      : <ul>
       { users.map(user =>
         <li key={user._id}>
          { user.isAdmin === false
          ? <div >
                  <div>Email: {user.email}</div>
                  <div>Name: {user.name}</div>
                  <div>Country: {user.country}</div>
                  <div>Phone Number: {user.phoneNumber}</div>
                  <button className="button">Delete</button> 
           </div>
           :  <div></div>
          }
          </li>
         )
      } 
    </ul>
         ) 
}

export default MyUsersScreen;