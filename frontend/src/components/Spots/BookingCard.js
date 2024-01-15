import React from "react";
import { Link, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import BookingDelete from "./BookingDelete";
import "./BookingCard.css";

const BookingCard = ({ booking }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isPastBooking = (endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    return end < today;
  };
  const isOngoingBooking = (startDate, endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= today && today <= end;
  };
  const cancelBtnStyles = {
    backgroundColor: "#FF5A5F",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div className="booking-card">
      <Link to={`/spots/${booking.Spot.id}`} className="booking-link">
        {booking.Spot.previewImage && (
          <img
            className="booking-image"
            alt={`Preview of Spot ${booking.Spot.id}`}
            src={booking.Spot.previewImage}
          />
        )}
        <div className="booking-info">
          <div className="booking-location">
            {booking.Spot.city}, {booking.Spot.state}
          </div>
          <div className="booking-dates">
            <p>Start: {formatDate(booking.startDate)}</p>
            <p>End: {formatDate(booking.endDate)}</p>
          </div>
          <div className="booking-price">
            <b>${booking.Spot.price}</b> night
          </div>
        </div>
      </Link>
      {!isPastBooking(booking.endDate) && !isOngoingBooking(booking.startDate, booking.endDate) && (
        <div className="booking-actions">
          <div className="booking-update-box">
            <NavLink
              to={`/bookings/edit/${booking.id}`}
              className="booking-action-button"
            >
              Update
            </NavLink>
          </div>
          <div className="booking-cancel-box">
            <OpenModalButton
              buttonText="Cancel"
              modalComponent={<BookingDelete bookingId={booking.id} />}
              style={cancelBtnStyles}
            />
          </div>
        </div>
      )}
      {isPastBooking(booking.endDate) && (
        <p className="past-booking-message">
          This booking has ended and cannot be modified.
        </p>
      )}

      {(isOngoingBooking(booking.startDate, booking.endDate)) && (
        <p className="past-booking-message">
          Ongoing bookings cannot be modified.
        </p>
      )}

    </div>
  );
};

export default BookingCard;
