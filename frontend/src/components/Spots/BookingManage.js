import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookings } from "../../store/bookings";
import { Link } from "react-router-dom";
import "./SpotsManage.css";
import "./GetAllSpots.css";

const BookingManage = () => {
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.bookings.userBookings);

  useEffect(() => {
    dispatch(thunkGetUserBookings());
  }, [dispatch]);

  return (
    <main className="outer-wrapper">
      <header className="manage-create-current-spots">
        <h3>Manage Your Bookings</h3>
      </header>
      <div className="photo-container">
        {userBookings?.Bookings && userBookings.Bookings.length > 0 ? (
          userBookings.Bookings.map((booking, i) => (
            <div key={i} className="inner-Container">
              {booking.Spot && booking.Spot.previewImage && (
                <Link to={`/spots/${booking.Spot.id}`}>
                  <img src={booking.Spot.previewImage} alt={`Preview of Spot ${booking.Spot.id}`} />
                </Link>
              )}
              <div className="booking-info">
                <div>Start Date: {booking.startDate}</div>
                <div>End Date: {booking.endDate}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </main>
  );
};

export default BookingManage;
