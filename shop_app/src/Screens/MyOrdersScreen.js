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

    const [addressOrder,setAdressOrder] = useState('');
    const [cityOrder,setCityOrder] = useState('');
    const [countryOrder,setCountryOrder] = useState('');
    const [name,setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [totalPrice,setTotalPrice] = useState('');

     //view more for phone version
     const [modalVisible, setModalVisible] = useState(false);
    
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

    const openModal = (order) =>{
            setModalVisible(true);
            setAdressOrder(order.addressOrder);
            setCityOrder(order.cityOrder);
            setCountryOrder(order.countryOrder);
            setName(order.name);
            setEmail(order.email);
            setTotalPrice(order.totalPrice);
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
              <div className="orders__hide">
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
              <div className="orders__hide">
                  <strong>
                      Email
                  </strong>
              </div>
              <div className="orders__hide">
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
              <a href="#seeMore" className="content__seeMore" onClick={() => openModal(order)}>View more</a>
              <a onClick={() => deleteHandler(order)}>Delete</a>
        </div>
       )
    }
    {
        modalVisible && 
        <form id="seeMore" className="seeMore">
          <div className="seeMore__content">
          <h2>User details</h2>
          <a onClick={() => setModalVisible(false)} className="close">&times;</a>
          <h4>Address</h4>
          <p>{addressOrder}</p>
          <h4>City</h4>
          <p>{cityOrder}</p>
          <h4>Country</h4>
          <p>{countryOrder}</p>
          <h4>Name</h4>
          <p>{name}</p>
          <h4>email</h4>
          <p>{email}</p>
          <h4>Total Price</h4>
          <p>{totalPrice}</p>
          </div>
        </form>
      } 
     </div>
    </div> 
    )

}

export default MyOrdersScreen;