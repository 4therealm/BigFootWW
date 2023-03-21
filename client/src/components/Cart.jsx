import React, { useEffect } from 'react';
import useCart from '../hooks/useCart';
import { useAppCtx } from '../utils/AppContext';

const Cart = () => {
  const { user } = useAppCtx();
  const { cart, getCart, updateItem, removeItem } = useCart(user);

  useEffect(() => {
    getCart();
  }, [user, getCart]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.productId}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(event) =>
                    updateItem(item.id, parseInt(event.target.value))
                  }
                  min="1"
                />
              </td>
              <td>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
