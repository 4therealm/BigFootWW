import React from 'react';
import { useAppCtx } from '../utils/AppContext';

const Cart = () => {
  const { user } = useAppCtx();

  return (
    <div>
      {user && user.cart && user.cart.items.length > 0 ? (
        <table>
          <thead>
            <tr>
       
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {user.cart.items.map((item) => (
              <tr key={item.productId}>
      
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default Cart;
