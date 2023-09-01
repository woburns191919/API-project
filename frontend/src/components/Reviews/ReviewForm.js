import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import ReviewModalChild from "./ReviewModalChild";
import OpenModalButton from "../OpenModalButton";
import StarRatingInput from "./StarRatingInput";
import { useParams } from "react-router-dom"
// import "./LoginForm.css";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
  }


  return(
  <form onSubmit={handleSubmit} >
  <h4>How was your stay?</h4>
  <textarea>
    Leave your review here...
  </textarea>
  <div className="star-rating-input">
    <StarRatingInput />
  </div>
    <button
    >
      Submit Your Review
    </button>
  </form>
  )
};

export default ReviewForm;
