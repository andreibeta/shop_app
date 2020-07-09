import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
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
                    ? <Link to="/myorders">My orders</Link>
                    : null
                }
                {
                    userInfo
                    ? <Link to="/" onClick={handleLogout}>Log out</Link>
                    // ? <button type="button" onClick={handleLogout}Log out></button>
                    : null
                }
                {
                    userInfo 
                    ?  <Link to="/myprofile">{userInfo.name}</Link>
                    : <Link to="/signin">Sign in</Link>
                }
                {
                    userInfo
                    ? <Link to="/changepassword">Change password</Link>
                    : null
                }
                {/* {
                    userInfo.isAdmin
                    ? <Link>Administration Panel</Link>
                    : userInfo.isAdmin = false
                } */}
            </div>
        </header>
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
        <main className="main">
            <div className="content">
                <Route path="/myprofile" component={MyProfileScreen} />
                <Route path="/myorders" component={MyOrdersScreen} />
                <Route path="/createproduct" component={CreateProductScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen}/>
                <Route path="/" exact={true} component={HomeScreen} />               
            </div>
            
        </main>
        <footer className="footer">
            All rights reserved!
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
