import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCurrentSpots } from "../../store/spots";
import SpotCardManage from "./SpotCardManage";
import { NavLink } from "react-router-dom";
import "./SpotsManage.css";

const SpotsManage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetCurrentSpots(sessionUser));
  }, [dispatch, sessionUser]);

  const currentSpots = useSelector(
    (state) => state.spots.allSpots ? Object.values(state.spots.allSpots) : []
  );

  return (
    <main className="outer-wrapper">
      <header className="manage-create-current-spots">
        <h3>Manage Your Spots</h3>
      </header>
      <section id="create-spot-for-manage">
        {currentSpots.length === 0 && (
          <NavLink to="/spots/new" className="create-new-spot-button">Create a New Spot</NavLink>
        )}
      </section>
      <div className="photo-container">
        {currentSpots.map((spot, i) => (
          <SpotCardManage key={i} spot={spot} />
        ))}
      </div>
    </main>
  );
};

export default SpotsManage;
