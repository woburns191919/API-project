import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { thunkCreateReview } from "../../store/reviews";
import { useHistory } from "react-router-dom"



const ReviewForm = ({ spotId }) => {
  const history = useHistory()
  const { closeModal } = useModal()
  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  const dispatch = useDispatch();


  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
  };

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    height: '100px'
  };

  const starInputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: '4px'
  };

  const buttonStyle = {
    backgroundColor: '#FF385C',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  };


const headingStyle = {
  paddingBottom: '10px',
  color: '#484848'
};






  const handleSubmit = async (e) => {
    e.preventDefault()
        const payload = {
          review,
          stars
        }

        history.push(`/spots/${spotId}`)

    payload && spotId && await dispatch(thunkCreateReview(payload, spotId));
    closeModal();
  }

  return (
    <div style={formContainerStyle}>
      <h4 style={headingStyle}>How was your stay?</h4>

      <label name="stars" htmlFor="stars">
        <textarea
          style={textareaStyle}
          placeholder="Leave your review here..."
          type="textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </label>

      <div className="star-rating-input">
        <label>
          <input
            style={starInputStyle}
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          />
        </label>{' '}Stars
      </div>

      <button
        style={buttonStyle}
        disabled={review.length < 10 || !stars}
        onClick={(e) => handleSubmit(e)}
      >
        Submit Your Review
      </button>
    </div>
  );
};

export default ReviewForm;
