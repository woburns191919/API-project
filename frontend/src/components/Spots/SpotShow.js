import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpotDetails } from "../../store/spots";
import { Link } from "react-router-dom";
import "./GetAllSpots.css";
import { useParams } from "react-router-dom";

const SpotShow = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { spotId } = params;
  console.log("im in spot show page");

  const spots = useSelector((state) =>
    state.spots.allSpots ? state.spots.allSpots[spotId] : []
  );

  const spotArr = Object.values(
    useSelector((state) =>
      state.spots.singleSpot ? state.spots.singleSpot : []
    )
  );
  console.log("spot!!", spotArr);

  // console.log('spot by id: ', spots.id.SpotImages)

  // const hasUserFinishedReservationWithinLastTenDays = true;
  // end date - today's date === 10  boolean

  useEffect(() => {
    dispatch(thunkGetSpotDetails(spotId));
  }, [dispatch]);

  if (!spots) return null;

  return (
    <>
      <main className="outer-wrapper">
        <div className="details-big-photo-container">
          {/* I am in spot page now { hasUserFinishedReservationWithinLastTenDays && < reviewComponent /> } */}
          <div className="preview-image-container">
            <Link key={spotId} to={`/spots/${spotId}`}>
              <img className="preview-image" src={`${spots.previewImage}`} />
            </Link>
          </div>
          <div className="small-images-container">
            {spotArr.map((spotObj, i) => (
              <div key={i} className="other-images">
                <Link to={`/spots/${spotId}`}>
                  <img class ="try-image" src={`${spotObj.url}`} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
};

export default SpotShow;
