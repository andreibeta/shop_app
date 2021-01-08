import React, { useEffect, useState } from 'react';
import { deleteUser, myListOfUsers } from '../actions/userActionsCreator';
import {useSelector, useDispatch} from 'react-redux';



function MyUsersScreen(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userList = useSelector(state => state.userList);
    const {users, loading, error} = userList;
    const dispatch = useDispatch();

    const userDelete = useSelector(state => state.userDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDelete;

    //view more for phone version
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
      if(userInfo.isAdmin){
      dispatch(myListOfUsers());
      }
    },[successDelete,userInfo]);

    const deleteHandler = (user) =>{
    dispatch(deleteUser(user._id));
    }

    const openModal = (user) =>{
      setModalVisible(true);
      setEmail(user.email);
      setName(user.name);
      setCountry(user.country);
      setPhoneNumber(user.phoneNumber);
    } 

    return (
      loading 
      ? <div> Loading...</div>
      : error ? <div>{error}</div> 
      : <div className="usersContainer">
          <h2>My users</h2>
          <div className="usersContainer__header">
          <h4>Email</h4>
          <h4 className="usersContainer__header__hide">Name</h4>
          <h4 className="usersContainer__header__hide">Country</h4>
          <h4 className="usersContainer__header__hide">Phone</h4>
          <h4>Action</h4>
          </div>
        { users.map(user =>
         <div className="usersContent" key={user._id}>
                  <div className="usersContent__email"> {user.email}</div>
                  <div className="usersContent__name"> {user.name}</div>
                  <div className="usersContent__country"> {user.country}</div>
                  <div className="usersContent__phone"> {user.phoneNumber}</div>
                  <a href="#seeMore" className="usersContent__more" onClick={() => openModal(user)}>View more</a>
                  <a className="usersContent__delete" onClick={() => deleteHandler(user)}>Delete</a> 
          </div>
         )
      }
      {
        modalVisible && 
        <form id="seeMore" className="seeMore">
          <div className="seeMore__content">
          <h2>User details</h2>
          <a onClick={() => setModalVisible(false)} className="close">&times;</a>
          <h4>Email</h4>
          <p>{email}</p>
          <h4>Name</h4>
          <p>{name}</p>
          <h4>Country</h4>
          <p>{country}</p>
          <h4>Phone Number</h4>
          <p>{phoneNumber}</p>
          </div>
        </form>
      } 
      </div>
         ) 
}

export default MyUsersScreen;