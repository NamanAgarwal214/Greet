import React from "react";
import { Link } from "react-router-dom";

export default function HomeLoggedOut() {
  return (
    <div className="landing-main">
      <div className="landing-header d-flex align-items-center">
        <img src="/images/misc/logo.png" className="img-fluid" alt="" />
        <h1>Greetings</h1>
      </div>
      <div className="row m-0">
        <div className="col-12 col-lg-5 col-md-5 col-sm-5">
          <h1>Feels headache to remember special dates?</h1>
          <h6>
            We have the solution. Save the events one time and feel free for
            lifetime. <br />
            Still here? Join now….
          </h6>
          <Link className="btn" to="/login">
            Get Started
          </Link>
        </div>
        <div className="col-12 col-lg-7 col-md-7 col-sm-7">
          <img className="img-fluid" src="/images/misc/email.png" alt="" />
        </div>
      </div>
    </div>
  );
}
