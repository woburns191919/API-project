import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkReviewDelete } from "../../store/reviews";

import { thunkGetReviewsBySpotId, thunkGetSpotDetails } from "../../store/spots";

import "./Reviews.css"
import "../Spots/SpotDelete.css"
// import "../Spots/SpotDelete.css"

const ConfirmDelete = ( { reviewId, spotId } ) => {
  // const { reviewId } = useParams();
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  // console.log('reviewId', reviewId)

  // console.log('spotId', spotId)

  const handleDelete = async () => {
    await dispatch(thunkReviewDelete(reviewId, spotId));
    await dispatch(thunkGetReviewsBySpotId(spotId));
    closeModal();
  };

  if (!reviewId) return null;

  return (
    <>
    <div id="delete-spot-confirm-modal">
      <h5>Confirm Delete</h5>
      <p id="delete-sure">Are you sure you want to remove this spot from the listings?</p>
      <div id="yes-button-review-delete-button">
      <button
      value={reviewId}
      onClick={handleDelete}
      >Yes(Delete Review)
      </button>
      </div>
      <div id="no-button-review-delete-button">
      <button
      onClick={closeModal}
      >No (Keep Review)</button>
      </div>
      </div>
    </>
  );
};

export default ConfirmDelete;
