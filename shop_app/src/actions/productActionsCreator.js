import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAILED,PRODUCT_SAVE_REQUEST,PRODUCT_SAVE_SUCCESS,PRODUCT_SAVE_FAILED
,PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAILED,PRODUCT_REVIEW_SUBMIT_REQUEST,PRODUCT_REVIEW_SUBMIT_SUCCESS,PRODUCT_REVIEW_SUBMIT_FAILED,
REVIEW_DELETE_REQUEST,REVIEW_DELETE_SUCCESS,REVIEW_DELETE_FAILED,REVIEW_DETAILS_REQUEST,REVIEW_DETAILS_SUCCESS,REVIEW_DETAILS_FAILED } from "../constants/productConstants";
import axios from 'axios';
import Axios from "axios";
import { get } from "js-cookie";

const productActionsCreator = () => async(dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});
        //ajax request to the server
        const { data } = await axios.get("/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload:data});
    }
    catch(error){
        dispatch({type:PRODUCT_LIST_FAILED, payload:error.message});
    }
    
}
  

const detailsProduct = (productId) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await axios.get("/api/products/"+productId);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
        }catch(error){
        dispatch({type: PRODUCT_DETAILS_FAILED, payload: error.message})
    }
}


const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete("/api/products/" + productId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAILED, payload: error.message });

  }
}



const saveProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
      const { userSignin: { userInfo } } = getState();
      if (!product._id) {
        const { data } = await Axios.post('/api/products/', product);
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        // const { data } = await Axios.put('/api/products/' + product._id, product, {
        //   headers: {
        //     'Authorization': 'Bearer ' + userInfo.token
        //   }
        // });
        const { data } = await Axios.put('/api/products/' + product._id);
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
  
    } catch (error) {
  
      dispatch({ type: PRODUCT_SAVE_FAILED, payload: error.message });
    }
  }
  //to do
  const detailsReview = (productId) => async (dispatch) => {
    try{
        dispatch({type: REVIEW_DETAILS_REQUEST, payload: productId});
        const {data} = await axios.get("/api/reviews/"+productId);
        dispatch({type: REVIEW_DETAILS_SUCCESS, payload: data});
        }catch(error){
        dispatch({type: REVIEW_DETAILS_FAILED, payload: error.message})
    }
}


const saveProductReview = (productId,name,rating,comment) => async (dispatch,getState) =>{
  try{
    const { userSignin: {userInfo} } = getState();
    dispatch({type: PRODUCT_REVIEW_SUBMIT_REQUEST, payload: {productId,name,rating,comment}});
    const { data } = await Axios.post('/api/reviews/', {productId,name,rating,comment});
    dispatch({type:PRODUCT_REVIEW_SUBMIT_SUCCESS, payload: data});
    alert("Review has been submited!");      
  }catch(error){
    dispatch({type: PRODUCT_REVIEW_SUBMIT_FAILED, payload: error.message});
    alert("Something went wrong!");
  }
}

const deleteReview = (reviewId) => async(dispatch,getState) => {
  try{
    const {userSignin: {userInfo} } = getState();
    dispatch({ type: REVIEW_DELETE_REQUEST, payload: reviewId});
    const { data } = await axios.delete(`/api/reviews/`+reviewId,
    {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: REVIEW_DELETE_SUCCESS, payload: data});
    alert("Review has been deleted");
    }
  catch(error){
    dispatch({type: REVIEW_DELETE_FAILED, payload: error.message});
    alert("Something went wrong");
  }
}

export {productActionsCreator, detailsProduct, saveProduct, deleteProduct, saveProductReview, deleteReview,detailsReview}