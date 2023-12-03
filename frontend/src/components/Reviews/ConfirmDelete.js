import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkReviewDelete } from "../../store/reviews";

import { thunkGetReviewsBySpotId, thunkGetSpotDetails } from "../../store/spots";

// import "./Reviews.css"
// import "../Spots/SpotDelete.css"
// import "../Spots/SpotDelete.css"

const ConfirmDelete = ( { reviewId, spotId } ) => {
  // const { reviewId } = useParams();
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  // console.log('reviewId', reviewId)

  // console.log('spotId', spotId)

  const modalContainerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const headingStyle = {
    color: '#484848',
    marginBottom: '15px'
  };

  const paragraphStyle = {
    color: '#484848',
    marginBottom: '20px'
  };

  const buttonStyle = {
    backgroundColor: '#FF385C',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '5px'
  };

  const noButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'darkgray'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  };





  const handleDelete = async () => {
    await dispatch(thunkReviewDelete(reviewId, spotId));
    await dispatch(thunkGetReviewsBySpotId(spotId));
    closeModal();
  };

  if (!reviewId) return null;


  return (
    <>
      <div id="delete-spot-confirm-modal" style={modalContainerStyle}>
        <h5 style={headingStyle}>Confirm Delete</h5>
        <p id="delete-sure" style={paragraphStyle}>Are you sure you want to remove this review?</p>
        <div style={buttonContainerStyle}>
          <button
            style={buttonStyle}
            value={reviewId}
            onClick={handleDelete}
          >
            Yes (Delete Review)
          </button>
          <button
            style={noButtonStyle}
            onClick={closeModal}
          >
            No (Keep Review)
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmDelete;
