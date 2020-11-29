import React, { useState,useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route,Redirect, Link } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './Screens/RegisterScreen';
import CreateProductScreen from './Screens/CreateProductScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import MyOrdersScreen from './Screens/MyOrdersScreen';
import {logout} from './actions/userActionsCreator';
import { useDispatch } from 'react-redux';
import MyProfileScreen from './Screens/MyProfileScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import MyUsersScreen from './Screens/MyUsersScreen';
import WelcomeHome from './components/WelcomeHome';
import { Router, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import NotFound from './Screens/NotFound';
import profile_2 from './images/profile-2.png';

function App(props) {
  const userSignin = useSelector(state=> state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const [qty,setQty] = useState(localStorage.getItem('myvalue') || '');
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    localStorage.setItem('myvalue', qty);
  }, [userInfo,qty]);

  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  const handleLogout = () => {
    dispatch(logout());
  }  
  return (
    <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">Shop </Link>
            </div>
            <div className="header-links">
                {
                    userInfo 
                    ?   <div class="dropdown">
                            <div className="userNav">
                            <img src={profile_2} className="image"></img>
                            <a class="dropbtn">{userInfo.name}</a>
                            </div>
                            <div class="dropdown-content">
                            <ul>
                               <li>
                                   <a href="#myprofile">My Profile</a> </li>
                               {
                               userInfo.isAdmin ?
                               null
                               :<li> <a href="#changepassword">Change Password</a></li>
                               
                                }
                               <li> <a href="/myorders">My orders</a> </li>
                            </ul> 
                            </div>
                        </div> 
                    : <a href="#signin">Sign in</a>
                }
                {
                    userInfo
                    ? null
                    : <Link to = "/register">Register</Link>
                }
                {
                    userInfo
                    ? <Link to="/" onClick={handleLogout}>Log out</Link>
                    // ? <button type="button" onClick={handleLogout}Log out></button>
                    : null
                }
                
                {
                    userInfo
                    ? userInfo.isAdmin
                      ?  <div class="dropdown">
                            <a class="dropbtn">Admin Panel</a>
                            <div class="dropdown-content">
                        <ul>
                            <li> <a href="/mylistofusers">My Users</a> </li>
                            <li> <a href="/createProduct">Create Product</a></li>
                        </ul>
                            </div>
                         </div> 
                        : null
                    : null
                }
                

               
            </div>
        </header>
        <Route path="/" exact={true} component={WelcomeHome} />   
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li>
                    <a href="index.html">Pants</a>
                </li>
                <li>
                    <a href="index.html">Shirts</a>
                </li>
            </ul>
        </aside>
            {/*////popup///// */}
            {userInfo ? <ChangePasswordScreen></ChangePasswordScreen> : null }
            {userInfo ? <MyProfileScreen></MyProfileScreen> : null}
            {userInfo ? null : <SigninScreen></SigninScreen>} 
            <Switch>
                <Route path ="/mylistofusers" component={MyUsersScreen} />
                <Route path="/myprofile" component={MyProfileScreen} />
                <Route path="/myorders" component={MyOrdersScreen}/> 
                <Route path="/createproduct" component={CreateProductScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                {/* <Route path="/signin" component={SigninScreen} /> */}
                <Route path="/register" component={RegisterScreen} />
                <Route path="/product/:id" render={(props) => <ProductScreen qty={qty} setQty={setQty} {...props}/>} />
                <Route path="/cart/:id?" exact={true} render={(props) => <CartScreen qty={qty} {...props}/>}/>  
                <Route path="/" exact={true} component={HomeScreen} />  
                <Route component={NotFound} />             
            </Switch> 
        <footer className="footer">
            All rights reserved!
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
