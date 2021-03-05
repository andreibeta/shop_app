import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview, deleteReview,detailsReview,saveProduct,submitRating } from '../actions/productActionsCreator';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SUBMIT_RESET }from '../constants/productConstants';
import profile_1 from '../images/profile-1.png';
import Gallery from './Gallery';
import {AiOutlinePlusSquare,AiOutlineMinusSquare} from 'react-icons/ai';
import profile_2 from '../images/profile-2.png';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Form from 'react-bootstrap/Form';
import MyVerticallyCenteredModal from '../components/MyVerticallyCenteredModal';
import ReviewsModal from '../components/ReviewsModal';


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
    const reviewList = useSelector(state => state.reviewList);
    const {reviews,loading:loadingReview,error:errorReview} = reviewList;
    // const reviewDelete = useSelector(state => state.reviewDelete);
    // const { loading: loadingDelete, success: successDelete, error: errorDelete } = reviewDelete;
    
    const [modalShow, setModalShow] = useState(false);
    const [modalReviewsShow,setModalReviewsShow] = useState(false);

    const dispatch = useDispatch();
    console.log(product);
    useEffect(() => {
        if (productSaveSuccess) {
          setRating(0);
          setComment('');
          dispatch({ type: PRODUCT_REVIEW_SUBMIT_RESET});
          
        }
        dispatch(detailsProduct(props.match.params.id));
        dispatch(detailsReview(props.match.params.id));
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
      dispatch(deleteReview(reviewId));
      dispatch(detailsReview(props.match.params.id));
    }
    const id = props.match.params.id;
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(saveProductReview(props.match.params.id,userInfo.name,rating,comment));
        dispatch(submitRating(props.match.params.id,rating));
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
                <Link to="/products">Back to results</Link>
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
                
                <h5 className="details__info__description-title"></h5>
                <p className="details__info__description">
                <h3>Description</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a tempor enim. Ut auctor eget nisl vitae dignissim. In ac molestie nulla, non placerat orci. Fusce sed libero ut lorem eleifend maximus. Ut placerat eleifend sem non porttitor. Suspendisse aliquam mauris massa. Sed egestas, nisl nec vulputate blandit, magna dui mattis justo, et vestibulum mauris libero id odio. Duis interdum rhoncus turpis. Proin quis vehicula mauris, nec tincidunt enim. Fusce faucibus leo sed lectus venenatis varius vitae eget nunc. Nunc vitae dolor ullamcorper, dignissim massa in, aliquam neque. Morbi placerat leo ac quam eleifend sollicitudin. Cras laoreet porttitor ex, porta mollis lacus fermentum in. Quisque vel velit ac lorem molestie cursus sed ac sem.
            
                  {product.description}   
                </p>
            </div>
            <div className="details__action">
                <ul>
                    <h2 className="details__action__name">
                        {product.name} 
                    </h2>
                    <h3 className="details__action__price">
                        Price: {product.price} $
                    </h3>
                    <li className="details__action__status">
                     
                      Status: {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                      
                     </li>
                    
                    <li className="details__action__size">
                     <Form.Label className="details__action__label">Pick size</Form.Label>
                     <br/>
                  <Form.Control size="lg" className="details__action__select" as="select">
                        <option>37</option>
                        <option>40</option>
                        <option>42</option>
                 </Form.Control>
                 </li>
                    <li className="details__action__quantity">
                      
                        <Form.Label>Quantity: </Form.Label>
                            <br/>
                            <AiOutlineMinusSquare style={{width:'1.5em', height:'1.5em'}}onClick={()=>handleDecrement(qty)}/>
                            <a style={{width:'2em', height:'2em'}}>{qty}</a>
                            <AiOutlinePlusSquare style={{width:'1.5em', height:'1.5em'}} onClick={()=>handleIncrement(qty)}/>
                             
                    </li>
                    <li className="details__action__addCart">
                        {product.countInStock > 0 ?
                        <button onClick ={handleAddToCart} className="details__action__button">Buy Now</button>
                        :
                        null}
                    </li>
                </ul>
            </div>
           <div className="bottom-content">
            <div className="content-margined">
            {!reviews && <div>There is no review</div>}
            <div className="container-top"> 
            <div className="container-top__writeReview" >
            <button className="container-top__writeReview__button" onClick={() => setModalShow(true)}>Write a review</button>
            </div>
            <h2 className="container-top__header">Review section</h2>
            
            </div>
            
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={()=>setModalShow(false)}
                userInfo={userInfo}
                id={product._id}
                />
            <ReviewsModal
              show={modalReviewsShow}
              onHide={()=>setModalReviewsShow(false)}
              reviews={reviews}
            />
            <ul className="content-margined__reviews" id="reviews">
              <div className="content-margined__reviews__descriptions">
              {reviews.slice(0,2).map((review) => (
            
                <li key={review._id}>
                  <div className="review">
                  <img className="review__image" src={profile_2}></img>
                  <div className="review__name">{review.name}</div>
                  {/* <div>
                    <Rating value={product.rating}></Rating>
                  </div> */}
                  { userInfo ?
                  userInfo.isAdmin ?
                  // <button className="review__button" onClick={() => deleteHandler(review._id)}>Delete</button>
                  <RiDeleteBin6Fill className="review__iconDelete" onClick={() => deleteHandler(review._id)}></RiDeleteBin6Fill>
                  :<div></div>
                  :null
                  }
                  
            
                  <div className="review__comment">{review.comment}</div>
                  
                  <div className="review__date">{review.createdAt.substring(0, 10)}</div>
                  </div>
                </li>
              ))}
              <div className="seeMore-container">
                <button className="seeMore-container__view" onClick={() => setModalReviewsShow(true)}>View all reviews </button>
              </div>
              </div>
              </ul>
             
          </div>             
            </div>
        </div>
            
            } 
            
        </div>
    );
}

export default ProductScreen;