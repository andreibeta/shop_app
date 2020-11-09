import React, { useEffect, useState } from 'react';
import {myOrders} from '../actions/cartActionsCreator';
import {useSelector, useDispatch} from 'react-redux';
import {deleteOrder} from '../actions/userActionsCreator';
import { Redirect } from 'react-router-dom';

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
            dispatch(myOrders());
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
    :<div className="orders-content">
        <h3>My Orders</h3> 
    <div className="orders">
            <div>
                  <strong>Order id</strong>
              </div>
              <div>
                  <strong>
                      Address
                  </strong>
              </div>
              <div>
                  <strong>
                      City
                  </strong>
              </div>
              <div>
                  <strong>
                      Country
                  </strong>
              </div>
              <div>
                  <strong>
                      Full Name
                  </strong>
              </div>
              <div>
                  <strong>
                      Email
                  </strong>
              </div>
              <div>
                  <strong>
                      Total Price
                  </strong>
              </div>
              <div>
                  <strong>
                      Action
                  </strong>
              </div>
            </div>
<div className="container-content"> 
    { orders.map(order =>
       
        <div className="content">
              <div className="content__id">{order._id}</div>
              <div className="content__address">{order.addressOrder}</div>
              <div>{order.cityOrder}</div>
              <div>{order.countryOrder}</div>
              <div>{order.name}</div>
              <div className="content__email">{order.email}</div>
              <div>{order.totalPrice}</div>
              <button onClick={() => deleteHandler(order)}>Delete</button>
        </div>,
               {/* <div>Address: {order.addressOrder}</div>
                <div>City: {order.cityOrder}</div>
                <div>Country: {order.countryOrder}</div>
              <div>Total Price: {order.totalPrice}</div>
                <div>Email: {order.email}</div>
                <button className="button" onClick={() => deleteHandler(order)}>Delete</button>  */}
       )
    }
     </div>
    </div> 
    )

}

export default MyOrdersScreen;