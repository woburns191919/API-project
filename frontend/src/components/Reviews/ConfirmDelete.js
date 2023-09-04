import { closeModal, useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkReviewDelete } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { thunkGetReviewsBySpotId, thunkGetSpotDetails } from "../../store/spots";
import SpotShow from "../Spots/SpotShow";
import "./Reviews.css"
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
    <div className="review-confirm-modal">
      <h5>Confirm Delete</h5>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <div id="yes-button-review-delete-button">
      <button
      value={reviewId}
      onClick={handleDelete}
      >Yes(Delete Review)
      </button>
      </div>
      <div className="no-button-review-delete">
      <button
      onClick={closeModal}
      >No (Keep Review)</button>
      </div>
      </div>
    </>
  );
};

export default ConfirmDelete;
