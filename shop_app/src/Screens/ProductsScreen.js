import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { productActionsCreator,productListSort } from '../actions/productActionsCreator';
import WelcomeHome from '../components/WelcomeHome';
import {TiShoppingCart} from 'react-icons/ti';
import Form from 'react-bootstrap/Form';

function ProductsScreen (props) {
    //here we want to define a hook
    const productList = useSelector(state => state.productList);
    const {products, loading, error,sort} = productList;
    const dispatch = useDispatch();

    //this stuff will run only when the componentDidMount
  
    useEffect(() => {
            //this will list the products
            dispatch(productActionsCreator());
            return () => {
             
            };
        },[]);
      const onSortingChange = (sort) =>{
        dispatch(productListSort(sort));   
      }
    return (
    loading ? <div> Loading...</div>: error ? <div>{error}</div> : 
    <div className="productsContainer">
    <h1 className="productsContainer__title">Products</h1>
    <div className="box">
    <div className="box__selectContent">
    <p className="box__selectContent__sort">Sort by</p>
    <Form.Control as="select" size="lg"
          onChange={e => onSortingChange(e.target.value)}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="ascending">Low-High(Price)</option>
          <option value="descending">High-Low(Price)</option>
    </Form.Control>
    <p className="box__selectContent__numProducts">Products:{products.length}</p>
    </div>
    </div>
    <div className="products">
    {
      // products.sort((a,b) => a.price < b.price ? 1: -1).map(product =>
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
  </div>
    )
}

export default ProductsScreen;