import { useState } from 'react';
import { useAppCtx } from '../utils/AppContext';

const useCart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useAppCtx();
  const userId = user._id;
  console.log('useCart userId: ', userId);


  const getCart = async () => {
    try {
      const response = await fetch(`/api/cart/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCart(data.cartItems);
      } else {
        throw new Error('Error fetching cart');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (productId, quantity) => {
    try {
      const response = await fetch('/api/cart/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cartItems);
      } else {
        throw new Error('Error adding item to cart');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const response = await fetch(`/api/cart/updateItem/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cartItems);
      } else {
        throw new Error('Error updating item in cart');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`/api/cart/removeItem/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cartItems);
      } else {
        throw new Error('Error removing item from cart');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { cart, getCart, addItem, updateItem, removeItem };
};

export default useCart;
