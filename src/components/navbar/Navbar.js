import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DispatchContext from "../../context/DispatchContext";
import StateContext from "../../context/StateContext";

export default function Navbar() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const logout = async () => {
    try {
      await axios.get("/api/user/logout", {
        withCredentials: true,
      });
      appDispatch({
        type: "flashMessage",
        value: "You logged out successfully!",
        status: true,
      });
      appDispatch({ type: "logout" });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="header">
      <nav className="nav nav--tour navbar">
        <h1>
          <Link className="header__logo" to="/">
            <img className="" src="/images/misc/logo.png" alt="logo" />
          </Link>
        </h1>
      </nav>
      {appState.loggedIn && (
        <div className="nav--user">
          <Link to="/me" className="nav__el">
            <img
              src={
                appState.user.photo
                  ? appState.user.photo
                  : "/images/misc/default.png"
              }
              alt="User"
              className="nav__user-img"
            />
            <span>{appState.user.username}</span>
          </Link>
          <Link to="/login" onClick={logout} className="nav__el">
            <span className="mb-2">Logout</span>
          </Link>
        </div>
      )}
      {!appState.loggedIn && (
        <div className="nav--user">
          <Link to="/signup" className="nav__el">
            Sign Up
          </Link>
          <Link to="/login" className="nav__el">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
