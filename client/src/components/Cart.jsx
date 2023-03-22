import React, { useEffect, useState } from 'react';
import { Container, Alert, Button, Row, Col } from 'react-bootstrap';
import { useAppCtx } from '../utils/AppContext';

const Cart = () => {
  const { user, userCart, setUserCart, updatedCart, setUpdatedCart } = useAppCtx();
  const [hasQuantityChanged, setHasQuantityChanged] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);


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

  const checkout = async () => {
    try {
      const response = await fetch(`/api/order/checkout/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: updatedCart }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Checkout successful:', data);
        setUpdatedCart([]); // Clear the cart
        setUserCart([]); // Update the user cart context
        setShowCheckoutSuccess(true); // Show a success message
      } else {
        throw new Error('Error during checkout');
      }
    } catch (error) {
      console.error(error);
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
    <Container className='cart-container'>
      {updatedCart.length > 0 ? (
        <div>
          {updatedCart.map((item, index) => (
            <Row key={item.productId} className="mb-3">
              <Col xs={12} md={3}><img src={item.imageUrl} alt={item.name} style={{width: '100px', height: '100px', objectFit: 'cover'}}></img></Col>
              <Col xs={12} md={3}>
                <Row>{item.name}</Row>
                <Row>${item.price}</Row>
                </Col>

              <Col xs={12} md={3}>
                <Button variant="text-primary" size="lg" onClick={() => decreaseQuantity(index)}>
                  -
                </Button>{' '}
                {item.quantity}{' '}
                <Button variant="text-primary" size="lg" onClick={() => increaseQuantity(index)}>
                  +
                </Button>
              </Col>
              <Col xs={12} md={3}>${item.price * item.quantity} </Col>

              <Col xs={12} md={3}>
                <Button variant="danger" size="sm" onClick={() => removeItem(user._id, item.productId)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
        </div>
      ) : (
        <Alert variant="info">Your cart is empty</Alert>
      )}
      <h3>Total Price: ${totalPrice}</h3>
      {hasQuantityChanged && (
        <Button variant="primary" onClick={updateCart}>
          Update Cart
        </Button>
      )}
    {showCheckoutSuccess && (
        <Alert variant="success" onClose={() => setShowCheckoutSuccess(false)} dismissible>
          Checkout successful!
        </Alert>
      )}
      <Button variant="primary" onClick={checkout}>
        Checkout
      </Button>
      </Container>
  );
};

export default Cart;
