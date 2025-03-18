import React, { useState } from "react"; // eslint-disable-line
import "./Login.css";
import assets from "../../assets/assets";
const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [userName, setUserName] = useState("");

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form">
        <h2>{currState}</h2>

        {currState === "Sign up" ? (
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        ) : null}
        <input
          type="email"
          placeholder="Email-Address"
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="password"
          className="form-input"
          required
        />
        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Login now"}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to our Terms & Privacy Policy.</p>
        </div>
        <div className="login-forgot">
          <p className="login-toggle">
            Already have an account{" "}
            <span onClick={() => setCurrState("Login")}>Click here</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
