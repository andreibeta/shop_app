import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActionsCreator';

function ProductScreen (props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error} =   productDetails;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        };
    },[])
    //console.log(props.match.params.id);
    //const product = data.products.find(product => product.id === props.match.params.id);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" +qty);
    }
    return (
        <div>
            <div className="back-to-results">
                <Link to="/">Back to results</Link>
            </div>
            {loading ? <div>Loading..</div>:
            error ? <div>{error}</div> :
            <div className="details">
            <div className="details-image">
                <img src ={product.image} alt="product"/>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    <li>
                        {product.rating} Stars ({product.numReviews} Reviews)
                    </li>
                    <li>
                        Price: <b>${product.price}</b>
                    </li>
                    <li>
                        Descripton:
                        <div>
                            {product.description}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: {product.price} $
                    </li>
                    <li>
                        Status: {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                    </li>
                    <li>
                        Quantity: 
                            <select value={qty} onChange={(event)=>{setQty(event.target.value)}}>
                                {[...Array(product.countInStock).keys()].map(x=>
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                )}
                            </select>
                    </li>
                    <li>
                        {product.countInStock > 0 ?
                        <button onClick ={handleAddToCart} className="button">Add to Cart</button>
                        :
                        null}
                    </li>
                </ul>
            </div>

            
        </div>
            
            } 
            
        </div>
    );
}

export default ProductScreen;