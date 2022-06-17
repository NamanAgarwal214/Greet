import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import DispatchContext from "../../context/DispatchContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import StateContext from "../../context/StateContext";
import moment from "moment";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);
  const stateContext = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [display, setDisplay] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dateOfEvent: "",
    event: "",
    description: "",
  });

  const { name, dateOfEvent, event, description } = formData;

  const change = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const editHandler = async (e) => {
    try {
      const res = await axios.put(
        `/api/friend/${id}`,
        { name, dateOfEvent, event, description },
        {
          headers: {
            Authorization: `Bearer ${stateContext.token}`,
          },
        }
      );
      // setOccasions(occasions.filter((el) => el._id !== id));
      if (res.data.status === "success") {
        appDispatch({
          type: "flashMessage",
          value: "Event edited successfully",
          status: true,
        });
      } else {
        appDispatch({
          type: "flashMessage",
          value: "Some error occured...Please try again",
          status: false,
        });
      }
    } catch (err) {
      appDispatch({
        type: "flashMessage",
        value: err.message,
        status: false,
      });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("GreetToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stateContext.token}`,
      },
    };
    if (!name || !dateOfEvent || !event) {
      appDispatch({
        type: "flashMessage",
        value: "Please fill the form completely!",
        status: false,
      });
    }
    try {
      const res = await axios.post(
        "/api/friend",
        { name, dateOfEvent, event, description },
        config
      );
      console.log(res.data);
      if (res.data.status === "success") {
        appDispatch({
          type: "flashMessage",
          value: "Event added successfully",
          status: true,
        });
        navigate("/", { replace: true });
      } else {
        appDispatch({
          type: "flashMessage",
          value: "Some error occured...Please try again",
          status: false,
        });
      }
    } catch (err) {
      appDispatch({
        type: "flashMessage",
        value: err.message,
        status: false,
      });
    }
  };

  // if(id){
  useEffect(() => {
    axios
      .get(`api/user/getFriend/${id}`, {
        headers: {
          Authorization: `Bearer ${stateContext.token}`,
        },
      })
      .then((res) => {
        setFormData({
          name: res.data.friend.name,
          dateOfEvent: moment(res.data.friend.dateOfEvent).format("YYYY-MM-DD"),
          event: res.data.friend.event,
          description: res.data.friend.description,
        });
        console.log(res.data);
      });
  }, [stateContext.token, id]);

  return (
    <>
      <Link className="" to="/">
        <img className="logo_create" src="/images/misc/logo.png" alt="logo" />
      </Link>
      <div className="contain">
        {!id ? (
          <h1 className="large">Create Your Event</h1>
        ) : (
          <h1 className="large">Edit Your Event</h1>
        )}
        <p className="lead">
          <i className="fa fa-user"></i> Let's get some information to set your
          event.
        </p>
        <form className="form" onSubmit={(e) => submit(e)}>
          <div className="form-group">
            <small className="form-text">Name of Friend</small>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => change(e)}
              className="inputField"
            />
          </div>
          <div className="form-group">
            <small className="form-text">Date of event</small>
            <input
              type="date"
              name="dateOfEvent"
              className="inputField"
              value={dateOfEvent}
              onChange={(e) => change(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">Event Name</small>
            <input
              type="text"
              placeholder="Birthday, anniversary, etc."
              name="event"
              value={event}
              onChange={(e) => change(e)}
              className="inputField"
            />
          </div>
          <div className="my-2">
            <button
              onClick={() => setDisplay(!display)}
              type="button"
              className="btn-1"
            >
              Add Special Message
            </button>
            {!id
              ? !display && (
                  <button
                    onClick={(e) => submit(e)}
                    type="button"
                    className="btn-1"
                  >
                    CREATE
                  </button>
                )
              : !display && (
                  <button
                    onClick={(e) => editHandler(e)}
                    type="button"
                    className="btn-1"
                  >
                    EDIT
                  </button>
                )}
          </div>
          {display && (
            <>
              <div className="form-group">
                <small className="form-text">Tell us more about Event</small>
                <textarea
                  placeholder="..."
                  rows="5"
                  cols="50"
                  name="description"
                  value={description}
                  onChange={(e) => change(e)}
                ></textarea>
              </div>
            </>
          )}
          {!id
            ? display && (
                <button
                  onClick={(e) => submit(e)}
                  type="button"
                  className="btn-1"
                >
                  CREATE
                </button>
              )
            : display && (
                <button
                  onClick={(e) => editHandler(e)}
                  type="button"
                  className="btn-1"
                >
                  EDIT
                </button>
              )}
        </form>
      </div>
    </>
  );
}

// CreateEvent.propTypes = {
//   addEvent: PropTypes.func.isRequired,
// };
