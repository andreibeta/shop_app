import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview, deleteReview } from '../actions/productActionsCreator';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SUBMIT_RESET }from '../constants/productConstants';
import profile_1 from '../images/profile-1.png';
import Gallery from './Gallery';
import {AiOutlinePlusSquare,AiOutlineMinusSquare} from 'react-icons/ai';


function ProductScreen (props) {
    const qty = props.qty;
    const setQty = props.setQty;
   
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
        //props.history.push("/cart/" + props.match.params.id + "?qty=" +qty);
        props.history.push("/cart/" + props.match.params.id);
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
      
    const handleIncrement = (qty) =>{
      if(qty >= 9){
        setQty(9);
      }else{
        setQty(prevCount => prevCount + 1);
      }
    }
    const handleDecrement = (qty) => {
        if(qty < 1){
          setQty(0);
        }else{
        setQty(prevCount => prevCount - 1);
        }
    }
    return (
        <div className="product-screen">
            <div className="back-to-results">
                <Link to="/">Back to results</Link>
            </div>
            {loading ? <div>Loading..</div>:
            error ? <div>{error}</div> :
            <div className="details">
            {/* <figure className="details__item">
                <img src ={product.image} alt="product" className="details__image"/>
            </figure> */}
            <div className="details__gallery">
            <Gallery/>
            </div>
            <div className="details__info">
                <h4 className="details__info__name">{product.name}</h4>
                <h5 className="details__info__description-title"></h5>
                <p className="details__info__description">
                <h3>Description</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a tempor enim. Ut auctor eget nisl vitae dignissim. In ac molestie nulla, non placerat orci. Fusce sed libero ut lorem eleifend maximus. Ut placerat eleifend sem non porttitor. Suspendisse aliquam mauris massa. Sed egestas, nisl nec vulputate blandit, magna dui mattis justo, et vestibulum mauris libero id odio. Duis interdum rhoncus turpis. Proin quis vehicula mauris, nec tincidunt enim. Fusce faucibus leo sed lectus venenatis varius vitae eget nunc. Nunc vitae dolor ullamcorper, dignissim massa in, aliquam neque. Morbi placerat leo ac quam eleifend sollicitudin. Cras laoreet porttitor ex, porta mollis lacus fermentum in. Quisque vel velit ac lorem molestie cursus sed ac sem.
            
                  {product.description}   
                </p>
            </div>
            <div className="details__action">
                <ul>
                    <li>
                        Price: {product.price} $
                    </li>
                    <li>
                        Status: {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                    </li>
                    <li>
                      Size:
                      <select>
                        <option>37</option>
                        <option>40</option>
                        <option>42</option>
                      </select>
                    </li>
                    <li>
                        Quantity: 
                            {/* <select value={qty} onChange={(event)=>{setQty(event.target.value)}}>
                                {[...Array(product.countInStock).keys()].map(x=>
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                )}
                            </select> */}
                            <AiOutlineMinusSquare onClick={()=>handleDecrement(qty)}/>
                            <a>{qty}</a>
                            <AiOutlinePlusSquare onClick={()=>handleIncrement(qty)}/>
                                 
                    </li>
                    <li>
                        {product.countInStock > 0 ?
                        <button onClick ={handleAddToCart} className="button">Add to Cart</button>
                        :
                        null}
                    </li>
                </ul>
            </div>
           <div className="bottom-content">
            <div className="content-margined">
            {!product.reviews && <div>There is no review</div>}
            <h2 className="content-margined__reviews__header">Reviews</h2>
            <ul className="content-margined__reviews" id="reviews">
              <div className="content-margined__reviews__descriptions">
              {product.reviews.map((review) => (
            
                <li key={review._id}>
                  <div className="review">
                  <img className="review__image" src={profile_1}></img>
                  <div className="review__name">{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div className="review__date">{review.createdAt.substring(0, 10)}</div>
                  <div className="review__comment">{review.comment}</div>
                  </div>
                  
                  { userInfo ?
                  userInfo.isAdmin ?
                  <button className="button" onClick={() => deleteHandler(review._id)}>Delete</button>
                  :<div></div>
                  :null
                  }
                </li>
              ))}
              </div>
              </ul>
              {/* <li> */}
          </div>             
          <div className="submit">
                <h2 className="submit__header">Write a customer review</h2>
                {userInfo ? (
                  <form className="submit__form" onSubmit={submitHandler}>
                    {/* <ul className="form-container">
                      <li> */}
                      <div>
                        <p className="submit__form__rating" htmlFor="rating">Rating</p>
                        <select
                          className="submit__form__selector"
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
                      </div>
                      {/* </li>
                      <li> */}
                      <div>
                        <p className="submit__form__comment" htmlFor="comment">Comment</p>
                        <textarea
                          className="submit__form__input"
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      {/* </li>
                      <li> */}
                        <button type="submit" className="submit__form__button">
                          Submit
                        </button>
                      {/* </li>
                    </ul> */}
                  </form>
                ) : (
                  <div>
                    Please <a href="#signin">Sign-in</a> to write a review.
                  </div>
                )}
              {/* </li> */}
              </div>
            </div>
        </div>
            
            } 
            
        </div>
    );
}

export default ProductScreen;