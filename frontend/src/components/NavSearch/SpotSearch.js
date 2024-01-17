import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkGetAllSpots } from '../../store/spots';

const SpotSearch = () => {
  const [searchParams, setSearchParams] = useState({ city: '', state: '' });
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(thunkGetAllSpots(searchParams));
    setSearchParams({ city: '', state: '' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="spot-search">
      <input
        type="text"
        placeholder="City"
        value={searchParams.city}
        onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
        onKeyPress={handleKeyPress}
      />
      <input
        type="text"
        placeholder="State"
        value={searchParams.state}
        onChange={(e) => setSearchParams({ ...searchParams, state: e.target.value })}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SpotSearch;
