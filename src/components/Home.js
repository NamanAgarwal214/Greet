import React, { useContext } from "react";
import StateContext from "../context/StateContext";
import HomeLoggedOut from "./home-LoggedOut/HomeLoggedOut";
import HomeLoggedIn from "./home-LoggedIn/HomeLoggedIn";

const Home = (props) => {
  const appState = useContext(StateContext);
  return (
    <>
      {!appState.loggedIn ? (
        <HomeLoggedOut />
      ) : (
        <HomeLoggedIn onClick={props.onClick} />
      )}
    </>
  );
};

export default Home;
