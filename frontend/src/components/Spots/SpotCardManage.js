import React from "react";
import { Link, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SpotDelete from "./SpotDelete";
import "./SpotCardManage.css"; 

const SpotCardManage = ({ spot }) => {

  const cancelBtnStyles = {
    backgroundColor: '#FF5A5F',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  };
  return (
    <div className="spot-card-manage">
      <Link to={`/spots/${spot.id}`} className="spot-link-manage">
        <img className="spot-image-manage" alt={spot.name} src={spot.previewImage} />
        <div className="spot-info-manage">
          <div className="spot-location-manage">{spot.city}, {spot.state}</div>
          <div className="spot-rating-manage">
            <i className="fa fa-star"></i>
            {spot.avgRating > 0 ? spot.avgRating.toFixed(2) : "new"}
          </div>
          <div className="spot-price-manage"><b>${spot.price}</b> per night</div>
        </div>
      </Link>
      <div className="spot-actions-manage">
        <NavLink to={`/spots/edit/${spot.id}`} className="update-action-button">Update</NavLink>
        <OpenModalButton
          buttonText="Delete"
          style={cancelBtnStyles}
          modalComponent={<SpotDelete spotId={spot.id} />}
        />
      </div>
    </div>
  );
};

export default SpotCardManage;
