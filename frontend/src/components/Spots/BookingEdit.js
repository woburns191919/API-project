import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { thunkUpdateBooking } from "../../store/bookings";
import "./form.css";

const BookingEdit = () => {
  const { bookingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.bookings.userBookings);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const booking = userBookings?.Bookings?.find(b => b.id === parseInt(bookingId));
    if (booking) {
      setStartDate(booking.startDate);
      setEndDate(booking.endDate);
    }
  }, [userBookings, bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId) {
      console.error('Booking ID is undefined');
      return;
    }
    const updatedBooking = { startDate, endDate };
    await dispatch(thunkUpdateBooking(updatedBooking, bookingId));
    history.push("/bookings/manage");
  };



  return (
    <main className="form-wrapper">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h3>Edit Your Booking</h3>
        <label>
          Start Date
          <input
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button type="submit">Update Booking</button>
      </form>
    </main>
  );
};

export default BookingEdit;
