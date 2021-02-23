import React, { useEffect, useState } from 'react';
import {myOrders} from '../actions/cartActionsCreator';
import {useSelector, useDispatch} from 'react-redux';
import {deleteOrder} from '../actions/userActionsCreator';
import { Redirect } from 'react-router-dom';
import {RiDeleteBin7Fill} from 'react-icons/ri';

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
<table className="container-content">
   <thead className="theader">
       <tr>
        <th>Order id</th>
        <th>Address</th>
        <th>City</th>
        <th>Country</th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Total price</th>
        <th>Action</th>
       </tr>
   </thead>
    { orders.map(order =>
       
        <tbody className="content">
              <tr>
              <td className="content__id">{order._id}</td>
              <td className="content__address">{order.addressOrder}</td>
              <td className="content__cityOrder">{order.cityOrder}</td>
              <td className="content__countryOrder">{order.countryOrder}</td>
              <td className="content__name">{order.name}</td>
              <td className="content__email">{order.email}</td>
              <td className="content__totalPrice">{order.totalPrice}</td>
              <a href="#seeMore" className="content__seeMore" onClick={() => openModal(order)}>View more</a>
              {/* <td><a onClick={() => deleteHandler(order)}>Delete</a></td> */}
              <td> <RiDeleteBin7Fill className="content__deleteOrder" onClick={()=>deleteHandler(order)}></RiDeleteBin7Fill></td>
              </tr>
        </tbody>
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
     </table>
    </div> 
    )

}

export default MyOrdersScreen;