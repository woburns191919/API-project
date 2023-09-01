import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal, closeModal } from "../../context/Modal";
import { useParams } from "react-router-dom"
import { thunkCreateReview } from "../../store/reviews";



// import "./LoginForm.css";

const ReviewForm = ({ spotId }) => {
  const { closeModal } = useModal()
  const [review, setReview] = useState('')
  const [stars, setStars] = useState(1)
  const dispatch = useDispatch();
  // const { spotId } = useParams()
  console.log('spotId from review form', spotId)

  const handleSubmit = async (e) => {
    e.preventDefault()
        const payload = {
          review,
          stars
        }
    await dispatch(thunkCreateReview(payload, spotId));
    closeModal();
  }

  return (

  <>
  <h4>How was your stay?</h4>
<label>
    Leave your review here...
  <input
  type="textarea"
  value={review}
  onChange={(e) => {
    setReview(e.target.value)
  }}
  />
</label>

  <div className="star-rating-input">
<label>
  <input
    type="number"
    value={stars}
    onChange={(e) => {
      setStars(e.target.value);
    }}

    // <StarRatingInput />
     />
    </label>
  </div>
    <button
    onClick={(e) => handleSubmit(e)}
    >
      Submit Your Review
    </button>
  </>
  )
};

export default ReviewForm;
