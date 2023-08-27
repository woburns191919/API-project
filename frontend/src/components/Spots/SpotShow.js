import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpotDetails } from "../../store/spots";
import { Link } from "react-router-dom";
import "./GetAllSpots.css";
import { useParams } from 'react-router-dom'


const SpotShow = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const { spotId } = params
  console.log("im in spot show page")

  const spots = useSelector((state) => (state.spots.allSpots ? state.spots.allSpots[spotId] : []))

  console.log('spot by id: ', spots.id.SpotImages)

  // const hasUserFinishedReservationWithinLastTenDays = true;
  // end date - today's date === 10  boolean


  useEffect(() => {
    dispatch(thunkGetSpotDetails(spotId));
  }, [dispatch]);

  return (
    <>
      <main className="outer-wrapper">
        <div className="big-photo-container">
          {/* I am in spot page now { hasUserFinishedReservationWithinLastTenDays && < reviewComponent /> } */}
            <div className="inner-container">
              <Link key = {spotId} to={`/spots/${spotId}`}>
                <img className="preview-image" src={`${spots.previewImage}`} />
              </Link>
              <div className="info">
                <div className="left-info">
                  <div className="city-state">
                  </div>
                  <div className="star-info">{spots.avgRating}</div>
                </div>

                <div className="right-info">${spots.price} night</div>
              </div>
            </div>
        </div>
      </main>
    </>
  );
};

export default SpotShow;
