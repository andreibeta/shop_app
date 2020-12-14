import React, { useEffect, useState } from 'react';
import { deleteUser, myListOfUsers } from '../actions/userActionsCreator';
import {useSelector, useDispatch} from 'react-redux';



function MyUsersScreen(props) {
   
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userList = useSelector(state => state.userList);
    const {users, loading, error} = userList;
    const dispatch = useDispatch();

    const userDelete = useSelector(state => state.userDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDelete;

    useEffect(()=>{
      if(userInfo.isAdmin){
      dispatch(myListOfUsers());
      }
    },[successDelete,userInfo]);

    const deleteHandler = (user) =>{
    dispatch(deleteUser(user._id));
    }

    return (
      loading 
      ? <div> Loading...</div>
      : error ? <div>{error}</div> 
      : <div className="usersContainer">
          <h2>My users</h2>
          <div className="usersContainer__header">
          <h4>Email</h4>
          <h4>Name</h4>
          <h4>Country</h4>
          <h4>Phone</h4>
          <h4>Action</h4>
          </div>
        { users.map(user =>
         <div className="usersContent" key={user._id}>
                  <span>Email</span>
                  <div className="usersContent__email"> {user.email}</div>
                  <span>Name</span>
                  <div className="usersContent__name"> {user.name}</div>
                  <span>Country</span>
                  <div className="usersContent__country"> {user.country}</div>
                  <span>Phone Number</span>
                  <div className="usersContent__phone"> {user.phoneNumber}</div>
                  <button className="usersContent__delete" onClick={() => deleteHandler(user)}>Delete</button> 
          </div>
         )
      }
      </div> 
         ) 
}

export default MyUsersScreen;