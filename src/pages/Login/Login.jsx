import React, { useState } from "react"; // eslint-disable-line
import "./Login.css";
import assets from "../../assets/assets";
import { signup, login } from "../../config/firebase";
const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currState === "Sign up") {
       signup(userName, email, password);
    } else {
       login(email, password);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h2>{currState}</h2>

        {currState === "Sign up" ? (
          <input 
            type="text"
            placeholder="Username"
            className="form-input"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        ) : null}
        <input
          type="email"
          placeholder="Email-Address"
          className="form-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
            {currState === "Sign up" ? "Already have an account?" : "Don't have an account?"}
            <span onClick={() => setCurrState(currState === "Sign up" ? "Login" : "Sign up")}>Click here</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
