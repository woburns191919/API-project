import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { thunkUpdateBooking } from "../../store/bookings";
import "./BookingEdit.css";

const BookingEdit = () => {
  const { bookingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.bookings.userBookings);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const errorStyle = {
    color: "red",
    textAlign: "center",
    padding: "10px",
    margin: "10px 0",
  };

  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };




  const navigateToManageBookings = () => {
    history.push("/bookings/manage");
  };


  useEffect(() => {
    const booking = userBookings?.Bookings?.find(
      (b) => b.id === parseInt(bookingId)
    );
    if (booking) {
      setStartDate(booking.startDate);
      setEndDate(booking.endDate);
    }
  }, [userBookings, bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId) {
      console.error("Booking ID is undefined");
      return;
    }

    const updatedBooking = { startDate, endDate };

    try {
      await dispatch(thunkUpdateBooking(updatedBooking, bookingId));
      history.push("/bookings/manage");
    } catch (error) {
      setError(
        error.message || "An error occurred while updating the booking."
      );
    }
  };

  return (
    <main className="form-wrapper">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h3>Edit Your Booking</h3>
        {error && (
          <div style={errorStyle}>

            <button onClick={navigateToManageBookings} className="navigate-back-button">
              Back to Manage Bookings
            </button>
          </div>
        )}
        {error && <div style={errorStyle}>{error}</div>}
        <label>
          Start Date
          <input
            type="date"
            min={getTodayDate()}
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            min={startDate || getTodayDate()}
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
