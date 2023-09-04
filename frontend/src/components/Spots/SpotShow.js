import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkGetSpotDetails,
  thunkGetReviewsBySpotId,
} from "../../store/spots";

import { Link } from "react-router-dom";
import "./GetAllSpots.css";
import "./SpotShow.css";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ReviewForm from "../Reviews/ReviewForm";
import ConfirmDelete from "../Reviews/ConfirmDelete";
import { useState } from "react";

const SpotShow = () => {

  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spotArr = useSelector((state) =>
    state.spots.singleSpot ? state.spots.singleSpot : []
  );

  const reviewsArr = useSelector((state) => state.spots.spot.Reviews);
  const loggedInUser = useSelector(
    (state) => state.session && state.session.user
  );
console.log('logged in user', loggedInUser)
  useEffect(() => {
    dispatch(thunkGetSpotDetails(spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(thunkGetReviewsBySpotId(spotId));
  }, [dispatch]);

  if (!spotArr.SpotImages) return null;
  console.log("spot array*******", spotArr);

  let months = ["Placeholder", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


  // console.log("spot array from details page", spotArr);
  console.log('reviews array', reviewsArr)

  return (
    <>
      <main className="outer-wrapper">
        <div className="spot-name">{spotArr.name}</div>

        <div className="spot-photo-wrapper">
          {spotArr.city}, {spotArr.state}, {""} {spotArr.country}
        </div>
        <div className="parent-flex">
          <div className="big-photo-container">
            {spotArr.SpotImages.map(
              (spotImageObj, i) =>
                spotImageObj.preview === true && (
                  // <div className="big-photo-inner-box" key={i}>
                  <img
                    key={i}
                    className="big-photo"
                    src={spotImageObj.url}
                  ></img>
                  // </div>
                )
            )}
          </div>
          <div className="small-photo-container">
            {spotArr.SpotImages.map(
              (spotImageObj, i) =>
                spotImageObj.preview === false && (
                  <div key={i}>
                    <img src={spotImageObj.url}></img>
                  </div>
                )
            )}
          </div>
        </div>

        <section className="lower-spot-show">
          <div className="description">
            <h2>
              Hosted by {spotArr.Owner.firstName} {"  "}{" "}
              {spotArr.Owner.lastName}
            </h2>
            <p className="description">{spotArr.description}</p>
          </div>
          <div className="price-star-review-wrapper">
            <div className="top-price-star-review-wrapper">
              <div className="night">
                {" "}
                <b>${spotArr.price} </b> night
              </div>
              <div className="stars">
                <i className="fa fa-star"></i>{" "}
                {spotArr.avgStarRating > 0 ? spotArr.avgStarRating.toFixed(2) : ""}{" "}
                &middot;
              </div>
              <div className="reviews">
                {spotArr.numReviews == 1
                  ? spotArr.numReviews + " " + "Review"
                  : spotArr.numReviews > 0 && spotArr.numReviews !== 1
                  ? spotArr.numReviews + " " + "Reviews"
                  : "new"}
              </div>
            </div>
            <div className="bottom-price-star-review-wrapper">
              <button
              onClick={() => alert("Feature coming soon")}
              className="reserve">Reserve</button>
            </div>
          </div>
        </section>

        <hr></hr>

        <section className="reviews-lower">
          <div className="reviews-lower-stars-number">
            <i className="fa fa-star"></i>{" "}
            {spotArr.avgStarRating > 0 ? spotArr.avgStarRating.toFixed(2) : "new"} &middot;{" "}
            {' '}
            {spotArr.numReviews === 1
              ? spotArr.numReviews + " " + "Review"
              : spotArr.numReviews > 0 && spotArr.numReviews !== 1
              ? spotArr.numReviews + " " + "Reviews"
              : spotArr.numReviews === 0 ? <p>Be the first to post a review!</p> :
              "new"}
          </div>
         { (loggedInUser && spotArr.Owner.id !== loggedInUser.id) &&
         (reviewsArr) && !(reviewsArr.find(el => el.userId === loggedInUser.id))
          && <Link to="/reviews/current">
            <OpenModalButton
              buttonText="Post Your Review"

              modalComponent={<ReviewForm spotId={spotId} />}
              />
          </Link>}

          <div className="reviews-lower-text">
          {

          reviewsArr && reviewsArr.concat().reverse().map((reviewsObj, i) => (
            <div key={i}>

                <h3>{reviewsObj.User.firstName}</h3>

                <h4>{months[parseInt(reviewsObj.createdAt.slice(5, 7))]}, {reviewsObj.createdAt.slice(0, 4)}</h4>

                <p>{reviewsObj.review}</p>

              { loggedInUser && loggedInUser.id === reviewsObj.userId && ( <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <ConfirmDelete reviewId={reviewsObj.id} spotId={spotId} />}
                />)}

              </div>
          ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default SpotShow;

/*
(reviewsArr && reviewsArr.length > 0 && !reviewsArr.map(el => el.userId === loggedInUser.id)[0]) &&

  {(reviewsArr && reviewsArr.length > 0 && !reviewsArr.map(el => el.userId === loggedInUser.id)[0])} &&

&& (reviewsArr.find(el => el.userId !== loggedInUser.id) &&
*/
