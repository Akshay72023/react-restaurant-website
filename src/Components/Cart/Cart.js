import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    const quantities = {};
    cartCtx.items.forEach((item) => {
      quantities[item.name] = (quantities[item.name] || 0) + +item.quantity;
    });
    setItemQuantities(quantities);
  }, [cartCtx.items]);

  const cartItems = (
    <ul className={classes['cart-items']}>
      {Object.keys(itemQuantities).map((itemName) => (
        <li key={itemName}>
          {itemName} -{+itemQuantities[itemName]}
        </li>
      ))}
    </ul>
  );

  let totalPrice = 0;
  cartCtx.items.forEach((item) => {
    totalPrice += item.price * +item.quantity;
  });

  return (
    <Modal onBackDropClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalPrice.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
