import React, { useEffect, useState } from 'react';
import { myProfile, editProfile } from '../actions/userActionsCreator';
import {useSelector, useDispatch} from 'react-redux';
import {FaUserCircle} from 'react-icons/fa';
import {AiOutlineUser,AiTwotonePhone} from 'react-icons/ai';
import {MdLocationOn,MdEmail} from 'react-icons/md';

function MyProfileScreen(props) {
   
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const {user, loading, error} = userDetails;

    const editDetails = useSelector(state => state.editProfile);
    const {loading: loadingEdit, save, error: errorEdit} = editDetails;

    const [name, updateName] = useState('');
    const [phoneNumber, updatePhoneNumber] = useState('');
    const [country, updateCountry] = useState('');

    const dispatch = useDispatch();

    useEffect(()=>{
        return () => {

        dispatch(myProfile());
            if (userInfo) {
            updateName(userInfo.name);
            updatePhoneNumber(userInfo.phoneNumber);
            updateCountry(userInfo.country);
            }else{
              props.history.push('/signin');
            }
        };
    },[userInfo])

    const editHandler = (e) => {
        e.preventDefault();
        dispatch(editProfile({ userId: userInfo._id , name, phoneNumber, country}));
    }

    return (
            <form id="myprofile" className="myprofile" onSubmit={editHandler}>
            <div className="myprofile__content">                   
                <FaUserCircle className="myprofile__content__icon"/>
                 <h2>Edit User Information</h2>
                    
                    <p><MdEmail className="labelIcon"/>Email</p>
                    <input type="name" name="email" id="email" placeholder={userInfo.email} disabled>
                    </input>
                    
                    <p><AiOutlineUser className="labelIcon"/>Name</p>
                    <input type="name" name="name" value={name} id="name" placeholder={user.name}
                                        onChange={(event)=>updateName(event.target.value)}>
                    </input>
                    
                    <p><AiTwotonePhone className="labelIcon"/>Number</p>
                    <input type="tel" name="phoneNumber" value={phoneNumber} id="phoneNumber" placeholder={user.phoneNumber}
                                        onChange={(event)=>updatePhoneNumber(event.target.value)}>
                    </input>

                    <p><MdLocationOn className="labelIcon" />Country</p>
                    <input type="text" name="country" id="country" value={country} placeholder={user.country}   
                                        onChange={(event)=>updateCountry(event.target.value)} >
                    </input>
                   
                        <button type="submit" className="myprofile__content__button">Submit</button>
                        <a href="#" class="myprofile__content__close">&times;</a>
                </div>
       </form>
         ) 
}

export default MyProfileScreen;