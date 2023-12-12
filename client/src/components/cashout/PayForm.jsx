import React from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const PayForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');

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

        const price = 12;

        const res = await fetch("http://localhost:5000/cash/create-payment-intent", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currency: 'usd',
            amount: price * 100,
            paymentMethodType: "card"
        }),
        });

        const { client_secret: clientSecret } = await res.json();

        const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
            return_url: `${window.location.origin}/success`,
        },
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            
        }
    };

  return (
    <form onSubmit={handleSubmit} className='px-4'>
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements}>Pay</button>
        {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}

export default PayForm