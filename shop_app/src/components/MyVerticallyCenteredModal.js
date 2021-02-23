import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {  saveProductReview , submitRating } from '../actions/productActionsCreator';
import Form from 'react-bootstrap/Form';

function MyVerticallyCenteredModal(props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    if(props.userInfo){
    e.preventDefault();
    // dispatch actions
    dispatch(saveProductReview(props.id,props.userInfo.name,rating,comment));
    dispatch(submitRating(props.id,rating));
    }else{
      alert("You need to submit!");
    }
  };
    return (
      
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName="writeReviewModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
             Write your review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="modalForm" onSubmit={submitHandler}>
            <Form.Control 
                as="select"
                className="modalForm__selector"
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
              </Form.Control>
                <Form.Control
                    as="textarea"
                    className="modalForm__comment"
                    rows={3}
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                        />
                  <Button className="modalForm__submit" type="submit" onClick={props.onHide}>Submit</Button>
                </Form>
        </Modal.Body>
      </Modal>
      
    );
  }

  export default MyVerticallyCenteredModal;