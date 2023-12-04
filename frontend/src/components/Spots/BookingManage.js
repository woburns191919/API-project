import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookings } from "../../store/bookings";

const BookingManage = () => {
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.bookings.userBookings);

  useEffect(() => {
    dispatch(thunkGetUserBookings());
  }, [dispatch]);

  // console.log('bookings from store', userBookings?.Bookings[0].id)


  return (
    <main className="booking-manage-wrapper">
      <h3>Your Bookings</h3>
      {userBookings?.Bookings && userBookings.Bookings.length > 0 ? (
        userBookings.Bookings.map((booking, index) => (
          <div key={index} className="booking-item">
            <div>Booking ID: {booking.id}</div>
            <div>Spot ID: {booking.spotId}</div>
            <div>Start Date: {booking.startDate}</div>
            <div>End Date: {booking.endDate}</div>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </main>
  );
};

export default BookingManage;
