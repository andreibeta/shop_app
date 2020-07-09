import React, { useEffect, useState } from 'react';
import { myProfile, editProfile } from '../actions/userActionsCreator';
import {useSelector, useDispatch} from 'react-redux';



function MyProfileScreen(props) {
   
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userDetails = useSelector(state => state.myProfile);
    const {users, loading, error} = userDetails;

    const editDetails = useSelector(state => state.editProfile);
    const {loading: loadingEdit, save, error: errorEdit} = editDetails;

    const [name, updateName] = useState('');
    const [phoneNumber, updatePhoneNumber] = useState('');
    const [country, updateCountry] = useState('');

    const dispatch = useDispatch();

    useEffect(()=>{
        return () => {
            dispatch(myProfile(name, phoneNumber, country));
            if (userInfo) {
            updateName(userInfo.name);
            updatePhoneNumber(userInfo.phoneNumber);
            updateCountry(userInfo.country);
            }
        };
    },[userInfo])

    const editHandler = (e) => {
        e.preventDefault();
        dispatch(editProfile({ userId: userInfo._id , name, phoneNumber, country}));
    }

    return (
        loading 
        ? <div> Loading...</div>
        : error ? <div>{error}</div> 
        :<div className="form">
        <form onSubmit={editHandler}>
        <ul className="form-container">
        {/* <li>
              <label htmlFor="name">
                Name
          </label>
              <input value={name} type="name" name="name" id="name" onChange={(e) => updateName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="phoneNumber">
                PhoneNumber
          </label>
              <input value={phoneNumber} type="tel" name="phoneNumber" id="phoneNumber" 
                                onChange={(e) => updatePhoneNumber(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input value={country} type="country" id="country" name="country" onChange={(e) => updateCountry(e.target.value)}>
              </input>
            </li>

            <li>
              <button type="submit" className="button primary">Update</button>
            </li> */}
                  
        { users.map(user =>
        
        <li key={user._id}>
                <div >
                    <h2>Edit User Information</h2>
                    <li>
                    <label htmlFor="email">
                         Email:
                    </label>
                    <input type="name" name="email" id="email" placeholder={userInfo.email} disabled>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="name">
                         Name:
                    </label>
                    <input type="name" name="name" value={name} id="name" placeholder={user.name}
                                        onChange={(event)=>updateName(event.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="phoneNumber">
                         Phone Number:
                    </label>
                    <input type="tel" name="phoneNumber" value={phoneNumber} id="phoneNumber" placeholder={user.phoneNumber}
                                        onChange={(event)=>updatePhoneNumber(event.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="country">
                         Country:
                    </label>
                    <input type="text" name="country" id="country" value={country} placeholder={user.country}   
                                        onChange={(event)=>updateCountry(event.target.value)} >
                    </input>
                    </li>
                        <li>
                        <button type="submit" className="button primary">Submit Modified Information</button>
                        </li>
                  </div>
             </li>
            )
         } 
       </ul>
       </form>
       </div> 
         ) 
}

export default MyProfileScreen;