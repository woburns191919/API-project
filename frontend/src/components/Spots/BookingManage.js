import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookings } from "../../store/bookings";
import { thunkGetSpotDetails } from "../../store/spots";
import { Link, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import BookingDelete from "./BookingDelete";
import "./SpotsManage.css";
import "./GetAllSpots.css";

const BookingManage = () => {
  // console.log('spot id?', spotId)
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.bookings.userBookings);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
          userBookings.Bookings.map((booking, i) => {
            const previewImage = booking.Spot.previewImage;

            return (
              <div key={i} className="inner-Container">
                <Link to={`/spots/${booking.Spot.id}`}>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt={`Preview of Spot ${booking.Spot.id}`}
                      className="spot-image"
                    />
                  )}
                  <div className="info">
                    <div className="left-info">
                      <div className="city-state">
                        {booking.Spot.city}, {booking.Spot.state}
                      </div>
                      <div className="star-info">
                        <i className="fa fa-star"></i>
                        {booking.Spot.avgRating > 0
                          ? booking.Spot.avgRating.toFixed(2)
                          : "new"}
                      </div>
                    </div>
                    <div className="right-info">
                      <b>${booking.Spot.price}</b> night
                    </div>
                    <div className="booking-dates">
                      <p>Start Date: {formatDate(booking.startDate)}</p>
                      <p>End Date: {formatDate(booking.endDate)}</p>
                    </div>
                  </div>
                </Link>
                <div className="booking-actions">
                  <NavLink
                    to={`/bookings/edit/${booking.id}`}
                    className="booking-action-button"
                  >
                    Update
                  </NavLink>
                  <OpenModalButton
                    buttonText="Cancel"
                    modalComponent={<BookingDelete bookingId={booking.id} />}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </main>
  );
};

export default BookingManage;
