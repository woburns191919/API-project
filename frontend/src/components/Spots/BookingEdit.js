import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { thunkGetBookingDetails, thunkUpdateBooking } from "../../store/bookings";
import "./form.css";

const BookingEdit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { bookingId } = useParams();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const bookingDetails = useSelector((state) => state.bookings[bookingId]);

  useEffect(() => {
    if (!bookingDetails) {
      dispatch(thunkGetBookingDetails(bookingId));
    } else {
      setStartDate(bookingDetails.startDate);
      setEndDate(bookingDetails.endDate);
    }
  }, [dispatch, bookingId, bookingDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBooking = {
      bookingId,
      startDate,
      endDate,
    };
    const editedBooking = await dispatch(thunkUpdateBooking(updatedBooking, bookingId));
    if (editedBooking.id) {
      history.push(`/bookings/${editedBooking.id}`);
    } else {
      return null;
    }
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
