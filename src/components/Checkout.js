import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { useCart } from '../components/CartContext';
import { useAuth0 } from '@auth0/auth0-react';
import stripePromise from '../utilities/stripe';

const Checkout = () => {
  const { cart, totalItems, subtotal } = useCart();
  const { isAuthenticated, user } = useAuth0();

  const calculateHST = () => subtotal * 0.13; // 13% HST for Ontario
  const calculateGST = () => subtotal * 0.05; // 5% GST for Ontario
  const calculateTotal = () => subtotal + calculateHST() + calculateGST();
  const total = calculateTotal().toFixed(2);

  const onSubmitOrder = (orderData) => {
    console.log(orderData);
    // Here, you can send the orderData to the server for processing and storage
    // You can use fetch or an API library to send a POST request to your server
    // Example: fetch('/api/submit-order', { method: 'POST', body: JSON.stringify(orderData) })
    // After successfully submitting the order, you can handle any further actions or redirects.
  };

  return (
    <div className="order-form">
      <h1 className="order-form-heading">Enter Your Information</h1>
      <p>Please inform us of any allergies prior to ordering. Thank you!</p>
      <div className="order-details">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>HST: ${calculateHST().toFixed(2)}</p>
        <p>GST: ${calculateGST().toFixed(2)}</p>
      </div>
      <p className="order-total">Total: ${total}</p>
      <Elements stripe={stripePromise}>
        <PaymentForm subtotal={subtotal} total={total} cart={cart} totalItems={totalItems} onSubmitOrder={onSubmitOrder} />
      </Elements>
    </div>
  );
};

export default Checkout;

