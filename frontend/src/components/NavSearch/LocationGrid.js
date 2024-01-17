import React from 'react';

const LocationGrid = ({ onSelectLocation }) => {
  const locations = ['Location 1', 'Location 2', 'Location 3'];

  return (
    <div className="location-grid">
      {locations.map((location) => (
        <div key={location} className="grid-cell" onClick={() => onSelectLocation(location)}>
          {location}
        </div>
      ))}
    </div>
  );
};

export default LocationGrid;
