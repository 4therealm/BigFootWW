import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({totalPrice}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('[error]', error);
    } else {
      try {
        // Call the backend to create a payment intent
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: totalPrice }), // Pass the total price in cents
        });
    
        if (response.ok) {
          const clientSecret = await response.text();
    
          // Confirm the payment
          const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
          });
    
          if (confirmError) {
            console.error('[error]', confirmError);
          } else {
            // Payment was successful, you can update the UI accordingly
            console.log('Payment successful');
          }
        } else {
          throw new Error('Error creating payment intent');
        }
      } catch (fetchError) {
        console.error('[error]', fetchError);
      }
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
