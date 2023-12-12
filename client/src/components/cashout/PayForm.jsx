import React from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./cashout.module.css";
import { removeProduct } from "../../redux/cartSlice";

const PayForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const { Meat } = useSelector((state) => state.cart);
    const { Vegetable } = useSelector((state) => state.cart);
    const { Drink } = useSelector((state) => state.cart);
    const { price } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (elements == null || stripe == null) {
          return;
        }
    
        const { error: submitError } = await elements.submit();
        if (submitError?.message) {
          setErrorMessage(submitError.message);
          return;
        }

        const res = await fetch("http://localhost:5000/cash/create-payment-intent", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              currency: 'usd',
              amount: price*100,
              paymentMethodType: "card"
          }),
          
        });

        try {
          const res = await fetch("http://localhost:5000/product", {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({
              User: user.username,
              Meat,
              Vegetable,
              Drink,
              price,
            }),
          });
          navigate(`/foods`);
        } catch (error) {
          console.error(error.message);
        }
    };

  return (
    <form onSubmit={handleSubmit} className='px-4'>
      <h1 className={classes.loginRight}>Price: {price}</h1><br></br>
        <PaymentElement />
        <button className={classes.submitButton} type="submit" disabled={!stripe || !elements}>Pay</button>
        {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}

export default PayForm