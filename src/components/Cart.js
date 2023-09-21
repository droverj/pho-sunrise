// Cart.js
import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import '../styles/Cart.scss';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    deliveryTime: '',
  });

  const handleRemove = (cartItem) => {
    removeFromCart(cartItem);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and order placement logic here
  };

  return (
    <div className="cart">
      {cart.length === 0 ? (
        <p>Shopping Cart is Empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((cartItem, index) => (
              <li className="cart-item" key={index}>
                <div className="item-info">
                  {cartItem.name} - ${cartItem.price.toFixed(2)} - Quantity: {cartItem.quantity}
                </div>
                <button className="remove-button" onClick={() => handleRemove(cartItem)}>Remove One</button>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="order-form">
        <h2>Customer Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={customerInfo.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliveryTime">Delivery Time</label>
            <input
              type="text"
              id="deliveryTime"
              name="deliveryTime"
              value={customerInfo.deliveryTime}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
