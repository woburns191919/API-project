import { closeModal, useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkReviewDelete } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { thunkGetReviewsBySpotId, thunkGetSpotDetails } from "../../store/spots";
import SpotShow from "../Spots/SpotShow";

const ConfirmDelete = ( { reviewId, spotId } ) => {
  // const { reviewId } = useParams();
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  console.log('reviewId', reviewId)

  console.log('spotId', spotId)

  const handleDelete = async () => {
    await dispatch(thunkReviewDelete(reviewId));
    await dispatch(thunkGetReviewsBySpotId(spotId))
    closeModal();
  };

  if (!reviewId) return null;

  return (
    <>
      <h5>Confirm Delete</h5>
      <h4>Are you sure you want to remove this spot from the listings?</h4>
      <button
      value={reviewId}
      onClick={handleDelete}
      >Yes(Delete Review)
      </button>
      <button
      onClick={closeModal}
      >No (Keep Review)</button>
    </>
  );
};

export default ConfirmDelete;
