import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { thunkCreateReview } from "../../store/reviews";
import { useHistory } from "react-router-dom"
import "./Reviews.css";


// import "./LoginForm.css";

const ReviewForm = ({ spotId }) => {
  const history = useHistory()
  const { closeModal } = useModal()
  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  const dispatch = useDispatch();
  // const { spotId } = useParams()
  console.log('spotId from review form', spotId)

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
  history.push(`/spots/${spotId}`)
  return (

  <>
  <h4>How was your stay?</h4>

<label
name="stars"
htmlFor="stars">


  <textarea
  placeholder="Leave your review here..."
  type="textarea"
  value={review}
  onChange={(e) => {
    setReview(e.target.value)
  }}
></textarea>
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
    </label>{' '}Stars

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
