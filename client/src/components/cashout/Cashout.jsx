import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import classes from "./cashout.module.css";
import PayForm from './PayForm'

const Cashout = () => {
  const stripePromise = loadStripe("pk_test_51OMWL9FnssTOqqY2YtzRC7OkRzWZVxCuHFKrjTzL68fldiqS248PZE8pLvLTYc4tFNFlqGEh0Wimrf2bNrqcqvCU00zw3JXaAv");
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PayForm />
    </Elements>
  );
};

export default Cashout