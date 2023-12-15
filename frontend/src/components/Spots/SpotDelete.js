import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSpotDelete, thunkGetCurrentSpots } from "../../store/spots";

const SpotDelete = ({ spotId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(thunkSpotDelete(spotId));
    await dispatch(thunkGetCurrentSpots());
    closeModal();
  };

  if (!spotId) return null;

  const modalContainerStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const headingStyle = {
    color: "#484848",
    marginBottom: "15px",
  };

  const paragraphStyle = {
    color: "#484848",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#FF385C",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    margin: "5px",
  };

  const noButtonStyle = {
    ...buttonStyle,
    backgroundColor: "darkgray",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  };

  return (
    <>
      <div id="delete-spot-confirm-modal" style={modalContainerStyle}>
        <h5 style={headingStyle}>Confirm Delete</h5>
        <p id="delete-sure" style={paragraphStyle}>
          Are you sure you want to remove this spot from the listings?
        </p>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={handleDelete}>
            Yes (Delete Spot)
          </button>
          <button style={noButtonStyle} onClick={closeModal}>
            No (Keep Spot)
          </button>
        </div>
      </div>
    </>
  );
};

export default SpotDelete;
