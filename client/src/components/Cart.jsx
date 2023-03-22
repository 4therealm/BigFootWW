import React, { useEffect, useState } from 'react';
import { Table, Container, Alert, Button } from 'react-bootstrap';
import { useAppCtx } from '../utils/AppContext';

const Cart = () => {
  const { user, userCart, setUserCart, updatedCart, setUpdatedCart } = useAppCtx();
  const [hasQuantityChanged, setHasQuantityChanged] = useState(false);

  useEffect(() => {
    if (user && user.cart) {
      setUpdatedCart(user.cart.items);
    }
  }, [user, setUpdatedCart]);

  const increaseQuantity = (index) => {
    const newCart = [...updatedCart];
    newCart[index].quantity += 1;
    setUpdatedCart(newCart);
    setHasQuantityChanged(true);
  };

  const decreaseQuantity = (index) => {
    const newCart = [...updatedCart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setUpdatedCart(newCart);
      setHasQuantityChanged(true);
    }
  };
  
  const removeItem = async (userId, productId) => {
    try {
      const response = await fetch(`/api/cart/${userId}/remove/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedUserCart = await response.json();
        console.log('Item removed:', updatedUserCart);
        setUpdatedCart(updatedUserCart.items);
      } else {
        throw new Error('Error removing item from cart');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPrice = () => {
    if (updatedCart.length > 0) {
      return updatedCart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    return 0;
  };

  const updateCart = async () => {
    try {
      const response = await fetch(`/api/cart/${user._id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCart),
      });

      if (response.ok) {
        const updatedUserCart = await response.json();
        setUserCart(updatedUserCart.items);
      } else {
        throw new Error('Error updating item quantities in cart');
      }
    } catch (error) {
      console.error(error);
    }
    setHasQuantityChanged(false);
  };

  const totalPrice = calculateTotalPrice();
  return (
    <Container>
      {updatedCart.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {updatedCart.map((item, index) => (
              <tr key={item.productId}>
                <td>{item.name}</td>
                <td>
                  <Button variant="text-primary" size="lg" color='red'  onClick={() => decreaseQuantity(index)}>
                    -
                  </Button>{' '}
                  {item.quantity}{' '}
                  <Button variant="text-primary" size="lg" color='red' onClick={() => increaseQuantity(index)}>
                    +
                  </Button>
                </td>
                <td>{item.price}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => removeItem(user._id, item.productId)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">Your cart is empty</Alert>
      )}
      <h3>Total Price: ${totalPrice}</h3>
      {hasQuantityChanged && (
        <Button variant="primary" onClick={updateCart}>
          Update Cart
        </Button>
      )}
    </Container>
  );
};

export default Cart;
