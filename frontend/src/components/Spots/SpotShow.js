import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkGetSpotDetails,
  thunkGetReviewsBySpotId,
} from "../../store/spots";
// import { thunkGetReviewsBySpotId } from "../../store/reviews";
import { Link } from "react-router-dom";
import "./GetAllSpots.css";
import { useParams } from "react-router-dom";

// import "./Reviews.css";

const SpotShow = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  // const spots = useSelector((state) =>
  //   state.spots.allSpots ? state.spots.allSpots[spotId] : []
  // );

  const spotArr = useSelector((state) =>
    state.spots.singleSpot ? state.spots.singleSpot : []
  );

  const reviewsArr = useSelector((state) => state.spots.spot.Reviews);

  useEffect(() => {
    dispatch(thunkGetSpotDetails(spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(thunkGetReviewsBySpotId(spotId));
  }, [dispatch]);


  if (!spotArr.SpotImages) return null;

  return (
    <>
      <main className="outer-wrapper">
        <div className="details-big-photo-container">
          {spotArr.SpotImages.map((spotImageObj, i) => (
            spotImageObj.preview === true &&
            <div key={i}>
              <img src={spotImageObj.url}></img>
            </div>
          ))}
        </div>
        <div className="small-images-container">
          {spotArr.SpotImages.map((spotImageObj, i) => (
            spotImageObj.preview === false &&
            <div key={i}>
              <img src={spotImageObj.url}></img>
            </div>
          ))}
        </div>

        <section className="lower-spot-show">
          <article className="description">
            <h2>
              Hosted by {spotArr.Owner.firstName}  {"  "} {spotArr.Owner.lastName}
            </h2>
          <p className="description">
            {spotArr.description}
          </p>
          </article>
          <div className="price-star-review-wrapper">
            <div className="top-price-star-review-wrapper">
              <div className="night">${spotArr.price} night</div>
              <div className="stars">{spotArr.avgStarRating} #.#</div>
              <div className="reviews">{spotArr.numReviews} reviews</div>
            </div>
            <div className="bottom-price-star-review-wrapper">
              <button className="reserve">Reserve</button>
            </div>
          </div>
        </section>
        <hr></hr>
        <section className="reviews-lower">
          <div className="reviews-lower-stars-number">
            {spotArr.avgStarRating} #.# {"  "} {spotArr.numReviews} reviews
          </div>
          <div className="reviews-lower-text">
            {reviewsArr?.map((reviewsObj, i) => (
              <div key={i}>
                <h3>{reviewsObj.User.firstName}</h3>
                <h4>{reviewsObj.createdAt.slice(0, 7)}</h4>
                <p>{reviewsObj.review}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default SpotShow;
