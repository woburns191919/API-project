import React from 'react';
import { useSelector } from 'react-redux';

const SearchResults = () => {
  const spots = useSelector(state => state.spots.allSpots);

  console.log('spots', spots)

  const spotsArray = spots ? Object.values(spots) : [];
  console.log('spots array', spotsArray)

  return (
    <div>
      {spotsArray?.map(spot => (
        <div key={spot.id}>
          <h3>{spot.name}</h3>
          <p>{spot.city}, {spot.state}</p>

        </div>
      ))}
    </div>
  );
};

export default SearchResults;
