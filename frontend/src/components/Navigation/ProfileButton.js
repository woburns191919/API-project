import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profileButtonContainer">
      <button onClick={openMenu} className="profileButton">
        <i className="fas fa-user-circle"></i>
      </button>
      <ul
        className={`dropdownMenu ${showMenu ? "showDropdown" : ""}`}
        ref={ulRef}
      >
        {user ? (
          <>
            <li className="dropdownItem">
              <p>Hello, {user.username}</p>
              <p>{user.email}</p>
            </li>
            <li className="dropdownItem">
              <Link to="/spots/current" onClick={() => setShowMenu(false)}>
                Manage Spots
              </Link>
            </li>

            <li className="dropdownItem">
              <Link to="/bookings/manage" onClick={() => setShowMenu(false)}>
                Manage Bookings
              </Link>
            </li>

            <li className="dropdownItem">
              <button onClick={logout} className="logoutButton">
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="dropdownItem">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={() => setShowMenu(false)}
                modalComponent={<SignupFormModal />}
              />
            </li>
            <li className="dropdownItem">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={() => setShowMenu(false)}
                modalComponent={<LoginFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
