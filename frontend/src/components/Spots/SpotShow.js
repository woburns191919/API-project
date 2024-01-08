import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkGetSpotDetails,
  thunkGetReviewsBySpotId,
} from "../../store/spots";
import { thunkCreateBooking } from "../../store/bookings";

import { Link, useHistory } from "react-router-dom";
import "./GetAllSpots.css";
import "./SpotShow.css";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ReviewForm from "../Reviews/ReviewForm";
import ConfirmDelete from "../Reviews/ConfirmDelete";
import { useState } from "react";
import SpotDelete from "./SpotDelete";
import BookingForm from "./BookingForm";

const SpotShow = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const spot = useSelector((state) => state.spots.singleSpot || {});
  const spotImages = spot.SpotImages || [];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const spotArr = useSelector((state) =>
    state.spots.singleSpot ? state.spots.singleSpot : []
  );

  const reviewsArr = useSelector((state) => state.spots.spot.Reviews);
  const loggedInUser = useSelector(
    (state) => state.session && state.session.user
  );
  const bookingError = useSelector((state) => state.bookings.bookingError);


  useEffect(() => {
    dispatch(thunkGetSpotDetails(spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(thunkGetReviewsBySpotId(spotId));
  }, [dispatch]);

  if (!spotArr.SpotImages) return null;


  let months = [
    "Placeholder",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const isOwner = sessionUser && spotArr.Owner && sessionUser.id === spotArr.Owner.id;

  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  const handleReserveClick = async () => {
    const bookingPayload = {
      spotId,
      userId: sessionUser.id,
      startDate,
      endDate,
    };

    try {
      const createdBooking = await dispatch(thunkCreateBooking(bookingPayload));
      if (createdBooking) {
        history.push("/bookings/manage");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderErrorMessages = () => {
    if (bookingError && bookingError.errors) {
      return Object.keys(bookingError.errors).map((key, index) => (
        <div key={index} className="error-message">
          {bookingError.errors[key]}
        </div>
      ));
    } else if (bookingError) {
      return <div className="error-message">{bookingError.message}</div>;
    }
    return null;
  };

  return (
    <main className="outer-wrapper">
      <div className="spot-name">{spot.name}</div>

      <div className="spot-photo-wrapper">
        <div className="content-and-reservation-wrapper">
          <div className="content-wrapper">
            <div className="parent-flex">
              <div className="big-photo-container">
                {spotImages
                  .filter((img) => img.preview)
                  .map((img, i) => (
                    <img key={i} className="big-photo" src={img.url} alt="" />
                  ))}
              </div>
              <div className="small-photo-container">
                {spotImages
                  .filter((img) => !img.preview)
                  .map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt=""
                      style={{
                        width: "100%",
                        height: "245px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="spot-info-box">
        <div className="host-info">

          <div>
            <div className="host-name">
              Hosted by {spotArr.Owner.firstName} {spotArr.Owner.lastName}
            </div>
            <p className="host-bio">{spotArr.Owner.bio}</p>
          </div>
        </div>
        <p className="description">{spotArr.description}</p>
      </div>
      <div className="lower-info-wrapper">
        <div className="top-price-star-review-wrapper">
          <div className="stars">
            <i className="fa fa-star"></i>{" "}
            {spotArr.avgStarRating > 0 ? spotArr.avgStarRating.toFixed(2) : ""}{" "}

          </div>
          <div className="reviews">
            {spotArr.numReviews == 1
              ? spotArr.numReviews + " " + "Review"
              : spotArr.numReviews > 0 && spotArr.numReviews !== 1
              ? spotArr.numReviews + " " + "Reviews"
              : "new"}
          </div>
        </div>
        <div className="reservation-box">
          {renderErrorMessages()}
          {!isOwner && <div className="reservation-content">
            <div className="price-info">
              <b>${spotArr.price}</b> per night
            </div>

            <div className="booking-options">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={getTodayDate()}
              placeholder="Check-in"
              required
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || getTodayDate()}
              placeholder="Check-out"
              required
            />
          </div>


            <button onClick={handleReserveClick} className="reserve-button">
              Reserve
            </button>
          </div>}
          {isOwner && (
  <div className="owner-section">
    <h3>Manage Your Spot</h3>
    <p>As the owner, you can't book this spot, but you can manage it here.</p>
    <button onClick={() => {/* navigate to edit page */}}>Edit Spot Details</button>
    <button onClick={() => {/* navigate to bookings page */}}>View Bookings</button>
    <button onClick={() => {/* navigate to reviews page */}}>Respond to Reviews</button>
  </div>
)}

          <div className="lower-spot-show">
            <div className="description"></div>
            <div className="price-star-review-wrapper"></div>
          </div>
        </div>
      </div>

      <hr />

      <section className="reviews-lower">
        <div className="reviews-lower-stars-number">
          <i className="fa fa-star"></i>{" "}
          {spotArr.avgStarRating > 0 ? spotArr.avgStarRating.toFixed(2) : "new"}{" "}
          &middot;{" "}
          {spotArr.numReviews === 1 ? (
            spotArr.numReviews + " " + "Review"
          ) : spotArr.numReviews > 0 && spotArr.numReviews !== 1 ? (
            spotArr.numReviews + " " + "Reviews"
          ) : spotArr.numReviews === 0 ? (
            <p>Be the first to post a review!</p>
          ) : (
            "new"
          )}
        </div>
        {loggedInUser &&
          spotArr.Owner.id !== loggedInUser.id &&
          reviewsArr &&
          !reviewsArr.find((el) => el.userId === loggedInUser.id) && (
            <Link to="/reviews/current">
              <OpenModalButton
                buttonText="Post Your Review"
                modalComponent={<ReviewForm spotId={spotId} />}
              />
            </Link>
          )}

        <div className="reviews-lower-text">
          {reviewsArr &&
            reviewsArr
              .concat()
              .reverse()
              .map((reviewsObj, i) => (
                <div key={i}>
                  <h3>{reviewsObj.User.firstName}</h3>
                  <h4>
                    {months[parseInt(reviewsObj.createdAt.slice(5, 7))]},{" "}
                    {reviewsObj.createdAt.slice(0, 4)}
                  </h4>
                  <p>{reviewsObj.review}</p>
                  {loggedInUser && loggedInUser.id === reviewsObj.userId && (
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={
                        <ConfirmDelete
                          reviewId={reviewsObj.id}
                          spotId={spotId}
                        />
                      }
                    />
                  )}
                </div>
              ))}
        </div>
      </section>
    </main>
  );
};

export default SpotShow;
