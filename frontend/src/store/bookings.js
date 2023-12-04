import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = '/bookings/get_user_bookings';
const CREATE_BOOKING = '/bookings/create_booking';
const UPDATE_BOOKING = '/bookings/update_booking';
const DELETE_BOOKING = '/bookings/delete_booking';


const actionGetUserBookings = (bookings) => ({
  type: GET_USER_BOOKINGS,
  bookings,
});

const actionCreateBooking = (booking) => ({
  type: CREATE_BOOKING,
  booking,
});

const actionUpdateBooking = (booking) => ({
  type: UPDATE_BOOKING,
  booking,
});

const actionDeleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId,
});


export const thunkGetUserBookings = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/current');
  if (response.ok) {
    const bookings = await response.json();
    dispatch(actionGetUserBookings(bookings));
    return bookings;
  }
};

export const thunkCreateBooking = (bookingPayload) => async (dispatch) => {

  const { spotId, startDate, endDate, userId } = bookingPayload;

  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      startDate,
      endDate,
    }),
  });

  console.log('res from boooking', res)

  if (res.ok) {
    const booking = await res.json();
    dispatch(actionCreateBooking(booking));
    console.log('booking from store*****', booking)
    return booking;
  }
};

export const thunkUpdateBooking = (bookingData, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bookingData),
  });
  if (response.ok) {
    const booking = await response.json();
    dispatch(actionUpdateBooking(booking));
    return booking;
  }
};

export const thunkDeleteBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(actionDeleteBooking(bookingId));
    return bookingId;
  }
};


const initialState = {};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BOOKINGS:
      return { ...state, userBookings: action.bookings };
    case CREATE_BOOKING:
      return { ...state, [action.booking.id]: action.booking };
    case UPDATE_BOOKING:
      return { ...state, [action.booking.id]: action.booking };
    case DELETE_BOOKING:
      const newState = { ...state };
      delete newState[action.bookingId];
      return newState;
    default:
      return state;
  }
};

export default bookingReducer;
