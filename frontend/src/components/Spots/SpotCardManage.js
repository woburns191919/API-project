import React from "react";
import { Link, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SpotDelete from "./SpotDelete";
import "./SpotCardManage.css";

const SpotCardManage = ({ spot }) => {
  const cancelBtnStyles = {
    backgroundColor: "#FF5A5F",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };
  return (
    <div className="spot-card-manage">
      <Link to={`/spots/${spot.id}`} className="spot-link-manage">
        <img
          className="spot-image-manage"
          alt={spot.name}
          src={spot.previewImage}
        />
        <div className="spot-info-manage">
          <div className="spot-info-manage-box">
            <div className="spot-location-manage">
              <span>{spot.city}, {spot.state} </span>
            </div>
            <div className="spot-rating-manage">
              <i className="fa fa-star filled"></i>
              {spot.avgRating > 0 ? spot.avgRating.toFixed(2) : <span className="no-reviews">No reviews yet</span>}
            </div>
          </div>
          <div className="spot-price-manage">
            <span className="price-amount-manage">${spot.price}</span> night
          </div>
        </div>
      </Link>
      <div className="spot-actions-manage">
        <div className="spot-manage-update-box">
          <NavLink
            to={`/spots/edit/${spot.id}`}
            className="update-action-button"
          >
            Update
          </NavLink>
        </div>
        <div className="spot-manage-cancel-box">
          <OpenModalButton
            buttonText="Delete"
            style={cancelBtnStyles}
            modalComponent={<SpotDelete spotId={spot.id} />}
          />
        </div>
      </div>
    </div>
  );
};

export default SpotCardManage;
