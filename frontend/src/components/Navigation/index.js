import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import "./Navigation.css";

const handleComingSoonClick = () => {
  alert("Feature coming soon!");
};

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

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
            <p className="anywhere" onClick={handleComingSoonClick}>
              Anywhere
            </p>
          </div>
          <div className="nav-item">
            <p className="anyweek" onClick={handleComingSoonClick}>
              Any week
            </p>
          </div>
          <div className="nav-item add-guests" onClick={handleComingSoonClick}>
            <p>Add guests</p>
            <div className="icon-box" onClick={handleComingSoonClick}>
              <i className="fa fa-search search-icon"></i>
            </div>
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
