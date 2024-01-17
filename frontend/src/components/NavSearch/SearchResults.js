import React from "react";
import { useSelector } from "react-redux";
import SpotCard from "../Spots/SpotCard";

const SearchResults = () => {
  const spots = useSelector((state) => state.spots.allSpots);
  const spotsArray = spots ? Object.values(spots) : [];
  return (
    <div className="search-results-page">
      <div className="spots-container">
        {spotsArray.length > 0 ? (
          spotsArray.map((spot) => <SpotCard key={spot.id} spot={spot} />)
        ) : (
          <p>No spots found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
