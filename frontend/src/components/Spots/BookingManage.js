import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserBookings } from "../../store/bookings";
import "./SpotsManage.css";
import "./GetAllSpots.css";

const BookingManage = () => {
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.bookings.userBookings);

  useEffect(() => {
    dispatch(thunkGetUserBookings());
  }, [dispatch]);

  // console.log('bookings from store', userBookings?.Bookings[0].id)

  return (
    <main className="outer-wrapper">
      <header className="manage-create-current-spots">
        <h3>Manage Your Bookings</h3>
      </header>
      <div className="photo-container">
        {userBookings?.Bookings && userBookings.Bookings.length > 0 ? (
          userBookings.Bookings.map((booking, index) => (
            <div key={index} className="inner-Container">
              <div className="booking-info">
                <div>Booking ID: {booking.id}</div>
                <div>Spot ID: {booking.spotId}</div>
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
