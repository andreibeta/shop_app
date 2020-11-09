import React from 'react';
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


function App(props) {
  const userSignin = useSelector(state=> state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
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
                            <a class="dropbtn">{userInfo.name}</a>
                            <div class="dropdown-content">
                                <a href="#myprofile">My Profile</a>
                                <a href="#changepassword">Change Password</a> 
                                <a href="/myorders">My orders</a>  
                            </div>
                        </div> 
                    : <Link to="/signin">Sign in</Link>
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
                        ? <Link to="/mylistofusers">Admin Panel</Link>
                        : null
                    : null
                }
                

                {/* {
                    userInfo.isAdmin
                    ? <Link>Administration Panel</Link>
                    : userInfo.isAdmin = false
                } */}
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
            <Switch>
                <Route path ="/mylistofusers" component={MyUsersScreen} />
                <Route path="/myprofile" component={MyProfileScreen} />
                <Route path="/myorders" component={MyOrdersScreen}/> 
                <Route path="/createproduct" component={CreateProductScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" exact={true} component={CartScreen}/>  
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
