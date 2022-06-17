import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { useImmerReducer } from "use-immer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StateContext from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import FlashMessage from "./components/flashMessage/FlashMessage";
import CreateEvent from "./components/createEvent/CreateEvent";
import EventList from "./components/eventList/EventList";
import IsUserRedirect from "./components/IsUserRedirect";
import ProfilePage from "./components/Profile";
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("GreetToken")),
    flashMessages: [],
    token: localStorage.getItem("GreetToken"),
    user: {
      username: localStorage.getItem("GreetAppUsername"),
      email: localStorage.getItem("GreetAppEmail"),
      phone: localStorage.getItem("GreetAppPhone"),
      photo: localStorage.getItem("GreetAppPhoto"),
    },
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login": {
        draft.loggedIn = true;
        draft.token = action.data.token;
        draft.user.username = action.data.user.name;
        draft.user.email = action.data.user.email;
        draft.user.phone = action.data.user.phone;
        draft.user.photo = action.data.user.photo;
        return;
      }
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push({
          message: action.value,
          status: action.status,
        });
        return;
      case "updateProfile":
        draft.user.username = action.data.username;
        draft.user.email = action.data.email;
        draft.user.phone = action.data.phone;
        draft.user.photo = action.data.photo;
        return;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      console.log("Fixed");
      localStorage.setItem("GreetToken", state.token);
      localStorage.setItem("GreetAppUsername", state.user.username);
      localStorage.setItem("GreetAppEmail", state.user.email);
      localStorage.setItem("GreetAppPhone", state.user.phone);
      localStorage.setItem("GreetAppPhoto", state.user.photo);
    } else {
      localStorage.removeItem("GreetToken");
      localStorage.removeItem("GreetAppUsername");
      localStorage.removeItem("GreetAppEmail");
      localStorage.removeItem("GreetAppPhone");
      localStorage.removeItem("GreetAppPhoto");
      // console.log("App else");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Fragment>
          <Router>
            <FlashMessage flashMessages={state.flashMessages} />
            <Routes>
              <Route path="/view-events" element={<EventList />} />
              <Route exact path="/create-event" element={<CreateEvent />} />
              <Route path="/me" exact element={<ProfilePage />} />
              <Route path="/edit/:id" element={<CreateEvent />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <IsUserRedirect loggedIn={state.loggedIn} name={<Login />} />
                }
              />
              {/* <Route path="/webcam" element={<WebCam />} /> */}
              <Route
                path="/signup"
                element={
                  <IsUserRedirect
                    loggedIn={state.loggedIn}
                    name={<Register />}
                  />
                }
              />
            </Routes>
          </Router>
        </Fragment>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
