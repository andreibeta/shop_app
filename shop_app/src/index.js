import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';   
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import productListReducer from './reducers/productListReducer';
import productDetailsReducer from './reducers/productDetailsReducer';
import cartReducer from './reducers/cartReducers';
import Cookie from 'js-cookie';
import signInReducer from './reducers/signInReducer';
import registerReducer from './reducers/registerReducer';
import productSaveReducer from './reducers/productSaveReducer';
import productDeleteReducer from './reducers/productDeleteReducer';
import placeOrderReducer from './reducers/placeOrderReducer';
import myOrdersReducer from './reducers/myOrdersReducer';
import orderDeleteReducer from './reducers/orderDeleteReducer';
import myProfileReducer from './reducers/myProfileReducer';
import editProfileReducer from './reducers/editProfileReducer';
import changePasswordReducer from './reducers/changePasswordReducer';
import myListOfUsersReducer from './reducers/myListOfUsersReducer';
import productReviewReducer from './reducers/productReviewReducer'


const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState ={cart:{cartItems, shipping:{}, payment:{}}, userSignin:{userInfo}};

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: signInReducer,
  userRegister: registerReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  placeOrder: placeOrderReducer,
  orderDetails: myOrdersReducer,
  orderDelete: orderDeleteReducer,
  myProfile: myProfileReducer,
  editProfile:editProfileReducer,
  changedPassword:changePasswordReducer,
  userList: myListOfUsersReducer,
  productReview: productReviewReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,initialState, composeEnhancers(applyMiddleware(thunk)));


const app = (
  <Provider store={store}>
         <App />
  </Provider>
)


ReactDOM.render(
  app,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
