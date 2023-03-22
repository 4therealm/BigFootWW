import React from 'react'
// import ShoppingCart from '../components/ShoppingCart'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cart from '../components/Cart'
const stripePromise = loadStripe('your_stripe_publishable_key');

const CartPage = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Cart />
      </Elements>
      
    </div>
  )
}

export default CartPage