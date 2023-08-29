import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpotDetails, thunkGetReviewsBySpotId } from "../../store/spots";
// import { thunkGetReviewsBySpotId } from "../../store/reviews";
import { Link } from "react-router-dom";
import "./GetAllSpots.css";
import { useParams } from "react-router-dom";
// import "./Reviews.css";

const SpotShow = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { spotId } = params;


  const spots = useSelector((state) =>
    state.spots.allSpots ? state.spots.allSpots[spotId] : []
  );

  const spotArr = Object.values(
    useSelector((state) =>
      state.spots.singleSpot ? state.spots.singleSpot : []
    )
  );


  // console.log("spot!!", spotArr);

  // console.log('spot by id: ', spots.id.SpotImages)



  useEffect(() => {
    dispatch(thunkGetSpotDetails(spotId));
  }, [dispatch]);


  useEffect(() => {
    dispatch(thunkGetReviewsBySpotId(spotId));
  }, [dispatch]);


  const reviewsArr = useSelector((state) => state.spots.spot.Reviews)
  console.log(reviewsArr)
  // const reviewDataFunction = thunkGetReviewsBySpotId(spotId)



  if (!spots || spotArr.length === 0) return null;

  return (
    <>
      <main className="outer-wrapper">
        <h3>{spotArr[12]}</h3>
        <p>{spotArr[9]}, {spotArr[10]}, {spotArr[11]}</p>
        <div className="details-big-photo-container">
          {/* I am in spot page now { hasUserFinishedReservationWithinLastTenDays && < reviewComponent /> } */}
          <div className="preview-image-container">
            <Link key={spotId} to={`/spots/${spotId}`}>
              <img className="preview-image" src={`${spots.previewImage}`} />
            </Link>
          </div>
          <div className="small-images-container">
            {spotArr.map((spotObj, i) => (
              i < 4 &&
              <div key={i} className="other-images">
                <Link to={`/spots/${spotId}`}>
                  <img className="try-image" src={`${spotObj.url}`} />
                </Link>
              </div>
            ))}
          </div>
        </div>


        <section className="lower-spot-show">
          <article className="description">
          {spotArr.map((spotObj, i) => (
            <div key={i}>
            <h2>
              {spotObj.firstName} {"  "} {spotObj.lastName}
            </h2>
            <p>
            </p>
            </div>
          ))}
          {spotArr[5]}
        </article>
        <div className = 'price-star-review-wrapper'>
          <div className= 'top-price-star-review-wrapper'>
            <div className = "night">
            ${spotArr[8]} night
            </div>
            <div className = "stars">
            {spotArr[7]} #.#
            </div>
            <div className = "reviews">
            {spotArr[6]} reviews
            </div>
          </div>
          <div className ='bottom-price-star-review-wrapper'>
            <button className="reserve">Reserve</button>
          </div>
        </div>
        </section>
        <section className="reviews-lower">
          <div className="reviews-lower-stars-number">
          {spotArr[7]} #.# {'  '} {spotArr[6]} reviews
          </div>
          <div className="reviews-lower-text">
            {reviewsArr.map((reviewsObj, i) => (
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
