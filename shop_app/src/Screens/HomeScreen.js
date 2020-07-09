import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { productActionsCreator } from '../actions/productActionsCreator';


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
    <ul className="products">
    {
      products.map(product =>
        <li key={product._id}>
          <div className="product">
              <img src={product.image} className="product-image"/>
              <div className="product-name">
                  <Link to={'/product/'+product._id}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">{product.price} $</div>
              <div className="product-rating">{product.rating} Stars ({product.numReviews} reviews)</div>
          </div>
      </li> 
      )
    }
      
  </ul>
    )
}

export default HomeScreen;