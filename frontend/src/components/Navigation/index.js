import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link } from "react";
import "./Navigation.css";

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
          </NavLink>
        </div>
        <div className="upper-right-nav-wrap">
        <div className="create-spot-in-manage-spots">
          {sessionUser && (
            <button>
              <NavLink to="/spots/new">Create a New Spot</NavLink>
            </button>
          )}
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
      <hr></hr>
    </>
  );
}

export default Navigation;

/*
  <div className="create-spot-in-manage-spots">
        {sessionUser &&
       <button>
          <Link to="/spots">
               Create a New Spot
             </Link>
          </button>
          }

      </div>
*/
