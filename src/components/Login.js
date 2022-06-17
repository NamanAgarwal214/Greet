import React, { useState } from "react";
import LoginForm from "./login/LoginForm";
import Navbar from "./navbar/Navbar";
import ResetFrom from "./resetPasswordForm/ResetFrom";

export default function Login() {
  const [forgotpassword, setForgotPassword] = useState(false);
  return (
    <>
      <Navbar />
      {!forgotpassword ? (
        <LoginForm setForgotPassword={setForgotPassword} />
      ) : (
        <ResetFrom setForgotPassword={setForgotPassword} />
      )}
    </>
  );
}
