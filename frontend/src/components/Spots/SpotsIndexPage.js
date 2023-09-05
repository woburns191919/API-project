import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots, thunkGetReviewsBySpotId } from "../../store/spots";
import "./GetAllSpots.css";
import { Link } from "react-router-dom";

const SpotsIndexPage = () => {
  const spots = Object.values(
    useSelector((state) => (state.spots.allSpots ? state.spots.allSpots : []))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllSpots());
  }, [dispatch]);
  return (
    <>
      <main className="outer-wrapper">
        <div className="photo-container">
          {spots.map((spotObj, i) => (
            <div  key={i} className="inner-container">
              <Link to={`/spots/${spotObj.id}`}>
                <img
                title={spotObj.name}
                src={`${spotObj.previewImage}`} />

                <div className="info">
                  <div className="left-info">
                    <div className="city-state">
                      {spotObj.city}, {"   "} {"   "}
                      {spotObj.state}
                    </div>
                    <div className="star-info">
                      <i className="fa fa-star"></i>
                      {spotObj.avgRating > 0
                        ? spotObj.avgRating.toFixed(2)
                        : "new"}
                    </div>
                  </div>

                  <div className="right-info">
                    <b>${spotObj.price}</b> night
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default SpotsIndexPage;

/*

  //<Tooltip content={spotObj.name}/>

  // useEffect(() => {
  //   dispatch(thunkGetReviewsBySpotId(spotId))
  // })
*/
