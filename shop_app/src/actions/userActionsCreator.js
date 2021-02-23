import axios from "axios";
import Cookie from 'js-cookie';
import { propTypes } from "react-grid-carousel";
import {USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED,
  USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAILED,
  PROFILE_USER_SUCCESS,PROFILE_USER_REQUEST,PROFILE_USER_FAILED,
  USER_LOGOUT,ORDER_DELETE_REQUEST, ORDER_DELETE_FAILED, ORDER_DELETE_SUCCESS,
  EDIT_PROFILE_REQUEST,EDIT_PROFILE_SUCCESS,EDIT_PROFILE_FAILED,
  CHANGE_PASSWORD_REQUEST,CHANGE_PASSWORD_SUCCESS,CHANGE_PASSWORD_FAILED,
  USERS_LIST_REQUEST,USERS_LIST_SUCCESS,USERS_LIST_FAILED,
  USER_DELETE_REQUEST,USER_DELETE_SUCCESS,USER_DELETE_FAILED,
  USER_FORGOT_REQUEST,USER_FORGOT_SUCCESS,USER_FORGOT_FAILED,
  USER_RESET_PASSWORD_REQUEST,USER_RESET_PASSWORD_SUCCESS,USER_RESET_PASSWORD_FAILED} from '../constants/userConstants';

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await axios.post("/api/users/signin", { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAILED, payload: error.message });
    }
}

const registerUser = (name, email, password, phoneNumber, country) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password, phoneNumber, country } });
    try {
      const { data } = await axios.post("/api/users/register", {name, email, password, phoneNumber, country });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      //Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAILED, payload: error.message });
    }
  }
  const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
  }

const myProfile = (email) => async (dispatch, getState) => {
  try{
  const { userSignin: { userInfo } } = getState();
  dispatch({type:PROFILE_USER_REQUEST, payload:email});
  const { data } = await axios.get("/api/users/"+email,{
    headers:{
      Authorization: 'Bearer ' + userInfo.token
    }
  });
  dispatch({type: PROFILE_USER_SUCCESS, payload: data});
  }catch(error){
    dispatch({type:PROFILE_USER_FAILED, payload: error.message})
  }
}

const editProfile = ({userId ,name , phoneNumber ,country, image}) => async (dispatch,getState) => {
  try{
    const { userSignin: { userInfo } } = getState();
    dispatch({ type:EDIT_PROFILE_REQUEST, payload:{userId, name, phoneNumber, country, image} });
    const { data } = await axios.put("/api/users/" + userId,
    {name, phoneNumber, country, image},{
      headers:{
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({type:EDIT_PROFILE_SUCCESS, payload: data});
    alert("Please log out and signin to see the updates!");
  }catch(error){
    dispatch({type:EDIT_PROFILE_FAILED, payload: error.message})
  }
}

const changePassword = (password) => async (dispatch,getState) => {
  try{
    const { userSignin: {userInfo}} = getState();
    dispatch({ type: CHANGE_PASSWORD_REQUEST, payload:password});
    const {data} = await axios.put("/api/users", {password},{
      headers:{
        Authorization: 'Bearer ' + userInfo.token
      }
    })
    dispatch({type:CHANGE_PASSWORD_SUCCESS, payload: data});
    alert("The password has been changed");
    Cookie.set('userInfo', JSON.stringify(data));
  }catch(error){
    dispatch({type:CHANGE_PASSWORD_FAILED, payload:error.message});
    alert("Something went wrong");
  }
}


const deleteOrder = (productId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: ORDER_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete("/api/orders/" + productId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAILED, payload: error.message });

  }
}


//ADMIN ACTION
const myListOfUsers = () => async (dispatch, getState) => {
  try{
  dispatch({type: USERS_LIST_REQUEST});
  const { userSignin : {userInfo} } = getState();
  const { data } = await axios.get("/api/users",{
    headers:
      { Authorization: 'Bearer ' + userInfo.token }
    });
  dispatch({type: USERS_LIST_SUCCESS, payload: data});
  }catch(error){
    dispatch({type: USERS_LIST_FAILED, payload: error.message})
  }
}


//ADMIN ACTION
const deleteUser = (userId) => async(dispatch,getState) => {
  try{
    const {userSignin: {userInfo}} = getState();
    dispatch({type: USER_DELETE_REQUEST, payload: userId});
    const {data} = await axios.delete("/api/users/"+userId,{
      headers:{
        Authorization:'Bearer ' +userInfo.token
      }
    });
    dispatch({type:USER_DELETE_SUCCESS,payload: data, success:true});
  }catch(error){
    dispatch({type:USER_DELETE_FAILED,payload:error.message});
  }
}

//SEND EMAIL WITH A RESET PASSWORD LINK TO THE USER
const forgotPassword = (email) => async(dispatch) => {
  dispatch({type:USER_FORGOT_REQUEST, payload:{email}});
  try{
    const {data} = await axios.put("/api/forgot-password",{email});
    dispatch({type:USER_FORGOT_SUCCESS,payload:data.message});
  }catch(error){
    dispatch({ type: USER_FORGOT_FAILED, payload: error.response.data.error});
  }
}

//RESET PASSWORD VIA EMAIL LINK
const resetPassword = (resetLink, newPassword) => async(dispatch) => {
  dispatch({type:USER_RESET_PASSWORD_REQUEST, payload:{resetLink,newPassword}});
  try{
    const {data} = await axios.put("/api/resetpassword",{resetLink,newPassword});
    dispatch({type:USER_RESET_PASSWORD_SUCCESS,payload:data.message});
  }catch(error){
    dispatch({type: USER_RESET_PASSWORD_FAILED,payload:error.response.data.error});
  }
}



export { signin, registerUser,logout,deleteOrder, myProfile,editProfile, changePassword, myListOfUsers, deleteUser,forgotPassword,resetPassword}