import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview, deleteReview } from '../actions/productActionsCreator';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SUBMIT_RESET }from '../constants/productConstants';

function ProductScreen (props) {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error} =   productDetails;
    const productReview = useSelector((state) => state.productReview);
    const { success: productSaveSuccess } = productReview;
    const reviewDelete = useSelector(state => state.reviewDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = reviewDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (productSaveSuccess) {
          alert('Review submitted successfully.');
          setRating(0);
          setComment('');
          dispatch({ type: PRODUCT_REVIEW_SUBMIT_RESET});
        }
        dispatch(detailsProduct(props.match.params.id));
        return () => {
          //
        };
      }, [productSaveSuccess]);
    //console.log(props.match.params.id);
    //const product = data.products.find(product => product.id === props.match.params.id);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" +qty);
    }
    const deleteHandler = (reviewId) => {
      dispatch(deleteReview(product._id, reviewId));
      console.log("Product id:",product._id);
      console.log("Review id:",reviewId);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(
          saveProductReview(props.match.params.id, {
            name: userInfo.name,
            rating: rating,
            comment: comment,
          })
        );
      };

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
            <div className="content-margined">
            <h2>Reviews</h2>
            {!product.reviews && <div>There is no review</div>}
            <ul className="review" id="reviews">
                    
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                  { userInfo.isAdmin ?
                  <button className="button" onClick={() => deleteHandler(review._id)}>Delete</button>
                  :<div></div>
                  }
                </li>
              ))}
              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>             
            
        </div>
            
            } 
            
        </div>
    );
}

export default ProductScreen;