import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';

const ShoppingCart = ({ cart }) => {
  const cartTotal = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <CardGroup>
            {cart.map((item) => (
              <Card key={item.id} style={{ width: '18rem', margin: '1rem', outline: '2px solid red' }}>
                <Card.Body>
                  <Card.Title>{item.product_name}</Card.Title>
                  <Card.Text>
                    Qty: {item.quantity} <br />
                    Price: ${item.price} <br />
                    total: ${item.quantity * item.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
          <h3>Cart Total: ${cartTotal.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
