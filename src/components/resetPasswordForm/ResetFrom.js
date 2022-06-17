import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DispatchContext from "../../context/DispatchContext";

export default function ResetFrom() {
  const appDispatch = useContext(DispatchContext);
  const history = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewpassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch("/api/user/resetPassword", {
        token,
        password: newPassword,
      });
      if (res.data && res.data.token) {
        appDispatch({
          type: "flashMessage",
          value: "Your password was reseted!",
          status: true,
        });
        appDispatch({ type: "login", data: res.data.token });

        history.push("/");
      } else {
        appDispatch({
          type: "flashMessage",
          value: "There was an error!",
          status: false,
        });
      }
    } catch (e) {
      console.log("There was an error");
    }
  };

  return (
    <div className="d-flex flex-row row g-0">
      <div className="form_details col">
        <p className="separate">Reset Password</p>
        <form className="login-form" action="">
          <div className="form__group">
            <label htmlFor="token" className="form__label">
              Reset Token sent to your mail
            </label>
            <input
              onChange={(e) => setToken(e.target.value)}
              id="token"
              type="text"
              placeholder="you@example.com"
              required
              className="form__input"
            />
          </div>
          <div className="form__group">
            <label htmlFor="newPassword" className="form__label">
              Password
            </label>
            <input
              onChange={(e) => setNewpassword(e.target.value)}
              type="password"
              placeholder="New Password"
              className="form__input"
              id="newPassword"
              required
              minLength="8"
            />
          </div>
          <button className="btn" onClick={handleResetPassword}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
