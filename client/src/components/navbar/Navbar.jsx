import React from "react";
import { Link } from "react-router-dom";
import classes from "./navbar.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  //const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    alert("Logout Successfully");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  if (!user) {
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <Link to="/" className={classes.title}>
              Cart Noodle Ordering
            </Link>
          </div>
          <div className={classes.center}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
          <div className={classes.right}>
            <button onClick={() => handleLogin()} className={classes.logout}>Login</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <Link to="/" className={classes.title}>
              Cart Noodle Ordering
            </Link>
          </div>
          <div className={classes.center}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link to="/">Home</Link>
              </li>
              { user.isAdmin == false && (
                <li className={classes.listItem}>
                  <Link to="/create">Order</Link>
              </li>
              )}
              { user.isAdmin == false && (
                <li className={classes.listItem}>
                <Link to="/foods">My Order</Link>
                </li>
              )}
              { user.isAdmin == true && (
                <li className={classes.listItem}>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
            </ul>
          </div>
          <div className={classes.right}>
            <AiOutlineUser className={classes.userIcon} />
            <div className={classes.cartIcon}>{user.username}</div>
            <button onClick={() => handleLogout()} className={classes.logout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
