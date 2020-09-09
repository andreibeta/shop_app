import React, { useEffect, useState } from 'react';
import { myListOfUsers } from '../actions/userActionsCreator';
import {useSelector, useDispatch} from 'react-redux';



function MyUsersScreen(props) {
   
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userList = useSelector(state => state.userList);
    const {users, loading, error} = userList;

    const [email,setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();

    useEffect(()=>{
        return () => {
            dispatch(myListOfUsers(email,name, phoneNumber, country));
        };
    },[])

   

    return (
      loading 
      ? <div> Loading...</div>
      : error ? <div>{error}</div> 
      : <ul>
       { users.map(user =>
         <li key={user._id}>
             <div >
                  <div>Email: {user.email}</div>
                  <div>Name: {user.name}</div>
                  <div>Country: {user.country}</div>
                  <div>Phone Number: {user.phoneNumber}</div>
                  <button className="button">Delete</button> 
               </div>
          </li>
         )
      } 
    </ul>
         ) 
}

export default MyUsersScreen;