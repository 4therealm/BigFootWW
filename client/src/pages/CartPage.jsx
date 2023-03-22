import React from 'react'
// import ShoppingCart from '../components/ShoppingCart'
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import Cart from '../components/Cart'
import ShoppingCart from '../components/ShoppingCart'


const CartPage = () => {
  return (
    <div>
      {/* <Elements stripe={stripePromise}>
        <Cart />
      </Elements> */}
      <ShoppingCart />
    </div>
  )
}

export default CartPage