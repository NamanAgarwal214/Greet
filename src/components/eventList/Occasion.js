import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Envelope from "../Envelope/Envelope";

const Occasion = (props) => {
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(true);
  };

  const hideHandler = () => {
    setShow(false);
  };

  return (
    <Fragment>
      {show && <Envelope desc={props.desc} onClose={hideHandler} />}
      <div className="col-md-4 col-sm-6">
        <div className="feature-text text-center  wow  slideInLeft animated">
          <div>
            <img
              className="eventimage rounded-pill"
              src={`/images/users/${props.occasion.photo}.png`}
              alt="photu"
            ></img>
          </div>

          <h4>{props.occasion.name}</h4>
          <Moment format="YYYY/MM/DD">{props.occasion.dateOfEvent}</Moment>
          <p>{props.occasion.event}</p>

          <div className="btns">
            <Link
              to={"/edit/" + props.occasion._id}
              className="text-decoration-none"
            >
              <button className="dltbtn">EDIT</button>
            </Link>
            <button onClick={showHandler} className="mx-2 message border-0">
              <i
                className="fas fa-envelope"
                style={{
                  color: "#3a3161",
                  fontSize: "2rem",
                }}
              ></i>
            </button>
            <button
              className="dltbtn"
              onClick={() => props.handleDelete(props.occasion._id)}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Occasion;
