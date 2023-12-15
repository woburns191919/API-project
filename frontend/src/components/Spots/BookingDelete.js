// BookingDelete.js
import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteBooking, thunkGetUserBookings } from "../../store/bookings";

const BookingDelete = ({ bookingId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(thunkDeleteBooking(bookingId));
    await dispatch(thunkGetUserBookings());
    closeModal();
  };

  if (!bookingId) return null;

  const modalStyle = {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ff5a5f",
    color: "white",
  };

  const keepButtonStyle = {
    ...buttonStyle,
    backgroundColor: "lightgray",
    color: "black",
  };

  return (
    <div style={modalStyle}>
      <h5>Confirm Delete</h5>
      <h4>Are you sure you want to cancel this booking?</h4>
      <div>
        <button style={cancelButtonStyle} onClick={handleDelete}>
          Yes (Cancel Booking)
        </button>
        <button style={keepButtonStyle} onClick={closeModal}>
          No (Keep Booking)
        </button>
      </div>
    </div>
  );
};

export default BookingDelete;
