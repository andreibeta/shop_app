import React, { useEffect, useState } from 'react';
import { myProfile, editProfile } from '../actions/userActionsCreator';
import {useSelector, useDispatch} from 'react-redux';
import {FaUserCircle} from 'react-icons/fa';
import {AiOutlineUser,AiTwotonePhone} from 'react-icons/ai';
import {MdLocationOn,MdEmail} from 'react-icons/md';
import { useForm } from "react-hook-form";

function MyProfileScreen(props) {
    const { register, handleSubmit, errors, formState } = useForm({
        mode: "onBlur",
      });

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const {user, loading, error} = userDetails;

    const editDetails = useSelector(state => state.editProfile);
    const {loading: loadingEdit, save:saveSuccess, error: errorEdit} = editDetails;

    const [name, updateName] = useState('');
    const [phoneNumber, updatePhoneNumber] = useState('');
    const [country, updateCountry] = useState('');

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(myProfile(userInfo.email));

        return () => {
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
        //e.preventDefault();
        dispatch(editProfile({ userId: userInfo._id , name, phoneNumber, country}));
        setTimeout(function() {
          window.location.href="#";
      }, 1000);
    }

    return (
            loading ? <div>Loading..</div>:
            error ? <div>{error}</div> :
            <form id="myprofile" className="myprofile" onSubmit={handleSubmit(editHandler)}>
            <div className="myprofile__content">                   
                <FaUserCircle className="myprofile__content__icon"/>
                 <h2>Edit User Information</h2>
                    
                    <p><MdEmail className="labelIcon"/>Email</p>
                    <input type="name" name="email" id="email" placeholder={userInfo.email} disabled>
                    </input>


                    {errors.name && <p style={{color:"red"}}><AiOutlineUser className="labelIcon"/>{errors.name.message}</p>}
                    {!errors.name && <p><AiOutlineUser className="labelIcon"/>Name</p>}
                    <input 
                    type="name" 
                    name="name" 
                    value={name} 
                    id="name" 
                    placeholder={user.name}
                    onChange={(event)=>updateName(event.target.value)}
                    ref={register({
                        required:"You must specify a name",
                        minLength:{
                            value:6,
                            message:"Name must have at least 6 characters"
                        },
                        maxLength:{
                            value:20,
                            message:"Name must have maximum 20 characters"
                        }
                      })}
                    style={{borderColor:errors.name && "red"}}
                    />


                    {errors.phoneNumber && <p style={{color:"red"}}><AiTwotonePhone className="labelIcon"/>{errors.phoneNumber.message}</p>}
                    {!errors.phoneNumber &&  <p><AiTwotonePhone className="labelIcon"/>Number</p>}
                    <input 
                    type="tel" 
                    name="phoneNumber" 
                    value={phoneNumber} 
                    id="phoneNumber" 
                    placeholder={user.phoneNumber} 
                    onChange={(event)=>updatePhoneNumber(event.target.value)}
                    pattern="[0-9]*"
                    ref={register({
                        required: "You must specify a phone number",
                        minLength:{
                        value:6,
                        message:"Phone number must have minimum 6 digits"
                        }, 
                        maxLength:{
                        value:12,
                        message:"Phone number must have maximum 12 digits"
                        }
                    })}
                    style={{borderColor:errors.phoneNumber && "red"}} 
                    />


                    {errors.country && <p style={{color:"red"}}><MdLocationOn className="labelIcon" />{errors.country.message}</p>}
                    {!errors.country &&  <p><MdLocationOn className="labelIcon" />Country</p>}
                    
                    <input 
                    type="text" 
                    name="country" 
                    id="country" 
                    value={country}  
                    placeholder={user.country} 
                    onChange={(event)=>updateCountry(event.target.value)}
                    ref={register({
                        required: "You must specify a Country",
                        minLength:{
                          value:4,
                          message:"Minimum length is 4"
                        }, 
                        maxLength:{
                          value:20,
                          message:"Maximum length is 20"
                        },
                      })}
                      style={{borderColor:errors.country && "red"}} 
                    />
                   
                        <button type="submit" href="#" className="myprofile__content__button" disabled={formState.isSubmiting}>Submit</button>
                        <a href="#" class="myprofile__content__close">&times;</a>
                </div>
       </form>
         ) 
}

export default MyProfileScreen;