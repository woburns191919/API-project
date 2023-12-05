import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookings } from "../../store/bookings";
import { Link, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import BookingDelete from "./BookingDelete";
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
              <Link to={`/spots/${booking.Spot.id}`}>
                <img src={booking.Spot.previewImage} alt={`Preview of Spot ${booking.Spot.id}`} className="spot-image" />
                <div className="info">
                  <div className="left-info">
                    <div className="city-state">
                      {booking.Spot.city}, {booking.Spot.state}
                    </div>
                    <div className="star-info">
                      <i className="fa fa-star"></i>
                      {booking.Spot.avgRating > 0 ? booking.Spot.avgRating.toFixed(2) : 'new'}
                    </div>
                  </div>
                  <div className="right-info">
                    <b>${booking.Spot.price}</b> night
                  </div>
                </div>
              </Link>
              <div className="booking-actions">
                <NavLink to={`/bookings/edit/${booking.id}`} className="update-button">Update</NavLink>
                <OpenModalButton
                  buttonText="Cancel"
                  modalComponent={<BookingDelete bookingId={booking.id} />}
                />
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
