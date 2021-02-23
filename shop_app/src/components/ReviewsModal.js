import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import profile_2 from '../images/profile-2.png';

function ReviewsModal(props){
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName="seeReviewsModal"
      >
          <Modal.Header  closeButton>
              <Modal.Title>
                  <h2>Reviews</h2>
              </Modal.Title>
          </Modal.Header>
          <Modal.Body className="seeReviewsModal__body">
          {props.reviews.map((review) => (
            
            <li key={review._id}>
              <div className="modalReview">
              <img className="modalReview__image" src={profile_2}></img>
              <div className="modalReview__name">{review.name}</div>
              <div className="modalReview__comment">{review.comment}</div>
              
              <div className="modalReview__date">{review.createdAt.substring(0, 10)}</div>
              </div>
            </li>
          ))}
          </Modal.Body>
      </Modal>
    )

}

export default ReviewsModal;