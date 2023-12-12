import React from "react";
import classes from "./hero.module.css";
import cart_noodles_1 from "../../assets/cart_noodles_1.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <section id="home" className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <h2 className={classes.title}>Let's Try Cart Noodle!!!</h2>
          <p className={classes.firstMsg}>Best Cart Noodle in the World</p>
          <p className={classes.secondMsg}>Delicious and Inexpensive</p>
          { (user && user.isAdmin == false) && (
            <div className={classes.buttons}>
              <button className={classes.buttonSee}>
                <Link to="/create">Order Now</Link>
              </button>
            </div>
          )}
        </div>
        <div className={classes.right}></div>
        <img src={cart_noodles_1} alt="" className={classes.cart_noodles_1} />
      </div>
    </section>
  );
};

export default Hero;
