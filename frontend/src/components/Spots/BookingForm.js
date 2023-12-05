import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateBooking } from '../../store/bookings';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import "./BookingForm.css"

const BookingForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingPayload = {
      spotId,
      userId: sessionUser.id,
      startDate,
      endDate,
    };

    try {
      const createdBooking = await dispatch(thunkCreateBooking(bookingPayload));
      if (createdBooking) {
        history.push('/bookings/manage');
        // Handle successful booking creation
        // Redirect or show success message
      }
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
