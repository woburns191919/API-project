import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookings } from "../../store/bookings";
import BookingCard from "./BookingCard"; // Assuming you've created this component
import "./BookingManage.css"; // This is where your CSS for BookingManage will go

const BookingManage = () => {
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.bookings.userBookings);

  useEffect(() => {
    dispatch(thunkGetUserBookings());
  }, [dispatch]);

  return (
    <main className="bookings-index-page">
      <div className="bookings-container">
        {userBookings?.Bookings && userBookings.Bookings.length > 0 ? (
          userBookings.Bookings.map((booking, i) => <BookingCard key={i} booking={booking} />)
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </main>
  );
};

export default BookingManage;
