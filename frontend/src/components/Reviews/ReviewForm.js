import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { thunkCreateReview } from "../../store/reviews";
import { useHistory } from "react-router-dom"
import "./Reviews.css"



const ReviewForm = ({ spotId }) => {
  const history = useHistory()
  const { closeModal } = useModal()
  const [review, setReview] = useState('')
  const dispatch = useDispatch();
  const [stars, setStars] = useState(0);


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
    textTransform: 'uppercase',
    width:'auto'
  };


const headingStyle = {
  paddingBottom: '10px',
  color: '#484848'
};


const renderStars = () => {
  let starsArray = [];
  for (let i = 1; i <= 5; i++) {
    starsArray.push(
      <i
        key={i}
        className={`fa fa-star ${i <= stars ? "active-star" : "inactive-star"}`}
        onClick={() => handleStarClick(i)}
      />
    );
  }
  return starsArray;
};



const handleStarClick = (starValue) => {
  setStars(starValue);
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

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div id="modal-overlay" onClick={handleOverlayClick}>
    <div style={formContainerStyle}>
      <h4 style={headingStyle}>How was your stay?</h4>

      <label name="stars" htmlFor="stars">
        <textarea
          style={textareaStyle}
          placeholder="Leave your review here (at least 10 characters)..."
          type="textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </label>

      <div className="star-rating-input">
        {renderStars()}
      </div>

      <button
        style={buttonStyle}
        hidden={review.length < 10 || !stars}
        disabled={review.length < 10 || !stars}
        onClick={(e) => handleSubmit(e)}
      >
        Submit Your Review
      </button>
    </div>
    </div>
  );
};

export default ReviewForm;
