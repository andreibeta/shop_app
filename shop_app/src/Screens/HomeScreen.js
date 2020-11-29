import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { productActionsCreator } from '../actions/productActionsCreator';
import WelcomeHome from '../components/WelcomeHome';
import {TiShoppingCart} from 'react-icons/ti';


function HomeScreen (props) {
    //here we want to define a hook
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();
   
    //this stuff will run only when the componentDidMount
    useEffect(() => {
            //this will list the products
            dispatch(productActionsCreator());
            return () => {
                
            };
        },[])
      
    return (
    loading ? <div> Loading...</div>: error ? <div>{error}</div> : 
    <div className="products">
    {
      products.map(product =>
        <div key={product._id}>
          <div className="product">
              <img src={product.image} className="product__image"/>
              <div className="product__name">
                  <Link to={'/product/'+product._id}>{product.name}</Link>
              </div>
              <div className="product__brand">{product.brand}</div>
              <div className="product__price">{product.price} $</div>
              <div class="star-ratings-css">
              <div class="star-ratings-css-top" style={{width:product.rating*20+"%"}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                  <div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              </div>
              <div className="product__rating">{product.rating} Stars ({product.numReviews} reviews)</div>
              <div className="product__redirect">
                <Link to={'/product/'+product._id}>See more <TiShoppingCart className="iconShop"/></Link>
              </div>
          </div>
      </div> 
      )
    }
      
  </div>
    )
}

export default HomeScreen;