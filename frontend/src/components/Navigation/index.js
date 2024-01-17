import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import LocationGrid from "../NavSearch/LocationGrid";
import { thunkGetAllSpots } from "../../store/spots";

import "./Navigation.css";

const handleComingSoonClick = () => {
  alert("Feature coming soon!");
};

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    startDate: "",
    endDate: "",
  });
  const [searchCity, setSearchCity] = useState("");
  const [searchState, setSearchState] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  const handleSelectDates = (dates) => {
    setSelectedDates(dates);
    setShowDatePicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const searchParams = {};
    if (searchCity) searchParams.city = searchCity;
    if (searchState) searchParams.state = searchState;

    dispatch(thunkGetAllSpots(searchParams));
    history.push("/search-results");
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <li>
        document.querySelector(document.querySelector(
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <>
      <header className="header">
      <div className="air-logo">
          <NavLink exact to="/">
            <i className="fa fa-house"></i>
            <h6>Slick Spots</h6>
          </NavLink>
        </div>
        <div className="nav-middle">
          <div className="nav-item">
            <input
              type="text"
              placeholder="City"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <input
              type="text"
              placeholder="State"
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <i className="fa fa-search search-icon" onClick={handleSearch}></i>
          </div>
        </div>
        <div className="upper-right-nav-wrap">
          <div className="create-spot-in-manage-spots">
            {sessionUser && (
              <NavLink to="/spots/new" className="rent-home-link">
                Rent Your Home
              </NavLink>
            )}
          </div>
          <div className="globe">
            <i class="fa fa-globe"></i>
          </div>

          <div className="header-right">
            <div className="list-icon">
              <i className="fa fa-list"></i>
            </div>
            <div className="sign-up">
              {isLoaded && <ProfileButton user={sessionUser} />}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navigation;
