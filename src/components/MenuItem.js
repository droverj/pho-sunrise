// MenuItem.js
import React from 'react';
import { useCart } from '../components/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import '../styles/MenuItem.scss';

const MenuItem = ({ groupedItem }) => {
  const { name, name_vietnamese, item_options } = groupedItem;
  const { addToCart, cart } = useCart();

  // Function to get the count of a specific item in the cart
  const getItemCount = (itemId) => {
    return cart.reduce((count, cartItem) => {
      return cartItem.id === itemId ? count + cartItem.quantity : count;
    }, 0);
  };

  return (
    <div className="menu-item">
      <div className='item-name'>
        <h3 className='english-name'>{name}</h3>
        <h3 className='vietnamese-name'>{name_vietnamese}</h3>
      </div>

      <div className='test-container'>
        <div className="item-options">
          {item_options.map((option) => (
            <div key={option.id} className='option'>
              <div className='details'>
                <span>{option.item_option}</span>
                <span>${parseFloat(option.price).toFixed(2)}</span>
              </div>
              <button
                onClick={() =>
                  addToCart({
                    id: option.id,
                    name: option.name,
                    item_option: option.item_option,
                    price: parseFloat(option.price).toFixed(2),
                  })
                }
              >
                order
              </button>

              <div className='quantity-added-container'>
                {getItemCount(option.id) > 0 ? (
                  <div className='quantity-added'>
                    <p className="count">{getItemCount(option.id)}</p>
                    <FontAwesomeIcon icon={faCartShopping} className="cart-icon" style={{ color: '#3C4755' }} size="1x" />
                  </div>
                ) : null}
              </div>

            </div>
          ))}
        </div>
        {/* PICTURE HERE */}
        <div className='test'>test</div>
      </div>

    </div>
  );
};

export default MenuItem;


