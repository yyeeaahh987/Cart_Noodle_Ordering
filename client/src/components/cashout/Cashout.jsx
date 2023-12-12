import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import classes from "./cashout.module.css";
import PayForm from './PayForm'
import { useSelector } from "react-redux";

const Cashout = () => {
  const stripePromise = loadStripe("pk_test_51OMWL9FnssTOqqY2YtzRC7OkRzWZVxCuHFKrjTzL68fldiqS248PZE8pLvLTYc4tFNFlqGEh0Wimrf2bNrqcqvCU00zw3JXaAv");
  const { price } = useSelector((state) => state.cart);

  const options = {
    mode: 'payment',
    amount: price*100,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    // Fully customizable with appearance API.
    appearance: {
      theme: 'stripe'
    },
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginWrapper}>
        <Elements stripe={stripePromise} options={options}>
          <PayForm />
        </Elements>
      </div>
    </div>
  );
};

export default Cashout