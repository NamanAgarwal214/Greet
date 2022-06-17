import React, { useContext, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import EventList from "../eventList/EventList";
import { Link, useNavigate } from "react-router-dom";
import StateContext from "../../context/StateContext";
import DispatchContext from "../../context/DispatchContext";

const HomeLoggedIn = (props) => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (appState.user.phone === undefined) {
      console.log("Hello");
      navigate("/me");
      appDispatch({
        type: "flashMessage",
        value: "Please update your phone number and profile image to continue",
        status: true,
      });
    }
    // eslint-disable-next-line
  }, [appState.user.phone]);

  return (
    <>
      <Navbar />
      <div className="landing-main">
        <div className="row m-0">
          <div className="col-12 col-lg-5 col-md-5 col-sm-5 mt-2">
            <h1>Forget to wish your loved ones...</h1>
            <h6 className="text">
              Do you feel headache to remember birthdays, anniversaries and
              other events ? <br />
              Leave it on us :{")"} <br /> Add events now
              <br />
            </h6>
            <h3>Happy Greet!!!</h3>

            {/* <Link className="btn" to="/login">Get Started</Link> */}
            <Link to="/create-event">
              <button className="btncreate">Create events</button>
            </Link>
          </div>
          <div className="col-12 col-lg-7 col-md-7 col-sm-7 mt-4">
            <img className="img-fluid" src="/images/misc/email.png" alt="" />
          </div>
        </div>
      </div>
      <EventList onClick={props.onClick} />
      <footer>
        <div className="foo">
          <p>© Copyright 2021 Greetings</p>
        </div>
      </footer>
    </>
  );
};

export default HomeLoggedIn;

// const appState = useContext(StateContext);

// useEffect(() => {
//   if (appState.token) {
//     axios
//       .get("/api/user/getUser", {
//         headers: {
//           Authorization: `Bearer ${appState.token}`,
//         },
//       })
//       .then((res) => {
//         // const { username, email, photo } = res.data;
//         // appState.user = {
//         //   username,
//         //   email,
//         //   photo,
//         // };
//         console.log("Home log in");
//         // localStorage.setItem("GreetAppUsername", username);
//         // localStorage.setItem("GreetAppEmail", email);
//         // localStorage.setItem("GreetAppPhoto", photo);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   } else {
//     localStorage.removeItem("GreetAppUsername");
//     localStorage.removeItem("GreetAppEmail");
//     localStorage.removeItem("GreetAppPhoto");
//     // console.log("Home else");
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
