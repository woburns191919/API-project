import React from "react";
import { Link } from "react-router-dom";
import "./SpotCard.css"; 

const SpotCard = ({ spot }) => {
  return (
    <div className="spot-card">
      <Link to={`/spots/${spot.id}`} className="spot-link">
        <img className="spot-image" alt={spot.name} src={spot.previewImage} />
        <div className="spot-info">
          <div className="spot-location">{spot.city}, {spot.state}</div>
          <div className="spot-rating">
            <i className="fa fa-star"></i>
            {spot.avgRating > 0 ? spot.avgRating.toFixed(2) : "new"}
          </div>
          <div className="spot-price"><b>${spot.price}</b> per night</div>
        </div>
      </Link>
    </div>
  );
};

export default SpotCard;
