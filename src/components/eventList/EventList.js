import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StateContext from "../../context/StateContext";
import DispatchContext from "../../context/DispatchContext";
import Occasion from "./Occasion";

const EventList = (props) => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [occasions, setOccasions] = useState([]);
  const getFriend = useCallback(() => {
    axios
      .get("/api/friend", {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.friends);
        if (res.data.friends.length === 0) setOccasions([]);
        else setOccasions(res.data.friends);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [appState.token]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/friend/${id}`, {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        },
      });
      setOccasions(occasions.filter((el) => el._id !== id));
      if (res.data.status === "success") {
        appDispatch({
          type: "flashMessage",
          value: "Event deleted successfully",
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

  useEffect(() => getFriend(), [getFriend]);

  return occasions.length ? (
    <Fragment>
      <div className="user-view">
        <div className="user-view__content">
          <section className="feature">
            <div className="container">
              <div className="col-md-12">
                <div className="heading text-center wow  slideInUp animated">
                  <h2 className="headcards">Your Friends</h2>
                </div>
              </div>
              <div className="row">
                {occasions.map((occasion) => {
                  return (
                    <Occasion
                      occasion={occasion}
                      handleDelete={handleDelete}
                      key={occasion._id}
                      desc={occasion.description}
                      onClick={props.onClick}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <Link to="/create-event">
        <button
          className="btncreate"
          style={{ margin: "auto", display: "block" }}
        >
          Create events
        </button>
      </Link>
    </Fragment>
  );
};

export default EventList;
