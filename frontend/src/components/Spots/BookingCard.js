import React from "react";
import { Link } from "react-router-dom";
import "./BookingCard.css"; 

const BookingCard = ({ booking }) => {
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          <div className="booking-location">{booking.Spot.city}, {booking.Spot.state}</div>
          <div className="booking-dates">
            <p>Start: {formatDate(booking.startDate)}</p>
            <p>End: {formatDate(booking.endDate)}</p>
          </div>
          <div className="booking-price"><b>${booking.Spot.price}</b> per night</div>
        </div>
      </Link>
    </div>
  );
};

export default BookingCard;
