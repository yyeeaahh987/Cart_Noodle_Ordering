import React from "react";
import classes from "./login.module.css";
import img from "../../assets/womaneating2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefaulr();

    try {
      const res = await fetch("/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      dispatch(login(data));
      navigate("/");
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginLeft}>
          <img src={img} alt="" className={classes.leftImg} />
        </div>
        <div className={classes.loginRight}>
          <h2 className={classes.title}>Login</h2>
          <form onSubmit={handleLogin} className={classes.loginForm}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={classes.submitButton}>Login</button>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
          {error && (
            <div className={classes.errorMessage}>
              Wrong credentials! Try differnt ones
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
