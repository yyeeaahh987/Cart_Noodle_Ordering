import React from "react";
import { Link } from "react-router-dom";
import classes from "./navbar.module.css";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to="/" className={classes.title}>
            CartNoodleOrdering
          </Link>
        </div>
        <div className={classes.left}>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Link to="/">Home</Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/contacts">Contacts</Link>
            </li>
            <li className={classes.listItem}>
              <a href="#foods">Food</a>
            </li>
            <li className={classes.listItem}>
              <Link to="/FAQ">FAQ</Link>
            </li>
            <li className={classes.listItem}>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </div>
        <div className={classes.right}>
          <AiOutlineUser className={classes.userIcon} />
          <Link to="/cart" className={classes.cartContainer}>
            <AiOutlineShoppingCart className={classes.cartIcon} />
            <div className={classes.cartQuantity}>0</div>
          </Link>
          <button onClick={() => handleLogout()} className={classes.logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
