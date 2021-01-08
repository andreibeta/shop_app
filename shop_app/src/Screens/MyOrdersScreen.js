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
            if(userInfo){
            dispatch(myOrders());
            }
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
              <div className="orders__hide">
                  <strong>
                      City
                  </strong>
              </div>
              <div className="orders__hide">
                  <strong>
                      Country
                  </strong>
              </div>
              <div className="orders__hide">
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
              <div className="content__cityOrder">{order.cityOrder}</div>
              <div className="content__countryOrder">{order.countryOrder}</div>
              <div className="content__name">{order.name}</div>
              <div className="content__email">{order.email}</div>
              <div className="content__totalPrice">{order.totalPrice}</div>
              <button onClick={() => deleteHandler(order)}>Delete</button>
        </div>
       )
    }
     </div>
    </div> 
    )

}

export default MyOrdersScreen;