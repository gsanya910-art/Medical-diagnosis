import React from "react";
import Login from "../components/Auth/Login";

const LoginPage = ({ onLogin }) => {
  return <Login onLogin={onLogin} />;
};

export default LoginPage;
