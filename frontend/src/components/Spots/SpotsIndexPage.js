import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../store/spots";
import SpotCard from "./SpotCard";
import "./GetAllSpots.css";

const SpotsIndexPage = () => {
  const spots = Object.values(
    useSelector((state) => (state.spots.allSpots ? state.spots.allSpots : []))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllSpots());
  }, [dispatch]);
 

  return (
    <main className="spots-index-page">
      <div className="spots-container">
        {spots?.map((spot, i) => <SpotCard key={i} spot={spot} />)}
      </div>
    </main>
  );
};

export default SpotsIndexPage;
