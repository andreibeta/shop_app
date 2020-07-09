import React, { useEffect, useState } from 'react';
import {myOrders} from '../actions/cartActionsCreator';
import {useSelector, useDispatch} from 'react-redux';
import {deleteOrder} from '../actions/userActionsCreator';

function MyOrdersScreen(props) {
    const orderDetails = useSelector(state => state.orderDetails);
    const {orders, loading, error} = orderDetails;
    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

    
    //this stuff will run only when the componentDidMount
    useEffect(() => {
            //this will list the products
            dispatch(myOrders(userInfo.email));
            return () => {
                // console.log(userInfo.email)
            };
        },[successDelete,userInfo])
    const deleteHandler = (order) =>{
          dispatch(deleteOrder(order._id));
        }

    
    return (
    loading 
    ? <div> Loading...</div>
    : error ? <div>{error}</div> 
    : <ul>
    {/* {
      orders.map(order =>{
        return( 
        (userInfo.email === order.email) && (<li key={order._id}>
          <div >
              <div>Address: {order.addressOrder}</div>
              <div>City: {order.cityOrder}</div>
              <div>Country: {order.countryOrder}</div>
              <div>Total Price: {order.totalPrice}</div>
              <div>Email: {order.email}</div>
              <button className="button" onClick={() => deleteHandler(order)}>Delete</button>
          </div>
      </li>)
        )
      }
      )
    } */}
     { orders.map(order =>
       <li key={order._id}>
           <div >
               <div>Address: {order.addressOrder}</div>
                <div>City: {order.cityOrder}</div>
                <div>Country: {order.countryOrder}</div>
              <div>Total Price: {order.totalPrice}</div>
                <div>Email: {order.email}</div>
                <button className="button" onClick={() => deleteHandler(order)}>Delete</button> 
             </div>
        </li>
       )
    } 
  </ul>
    )
}

export default MyOrdersScreen;