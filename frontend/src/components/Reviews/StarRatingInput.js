import { useEffect, useState } from 'react';


const StarRatingInput = ({ rating, onChange }) => {
  const [starRating, setStarRating] = useState(rating)

  useEffect(() => {
    setStarRating(rating);
  }, [rating])


  return (
    <div className="star-rating'input">
      <div

      >
        <i className="fa fa-star"></i>

      </div>

    </div>
  )
}


export default StarRatingInput
