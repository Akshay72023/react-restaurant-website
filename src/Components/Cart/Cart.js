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
      quantities[item.name] = {
        quantity: (quantities[item.name]?.quantity || 0) + +item.quantity,
        price: item.price,
      };
    });
    setItemQuantities(quantities);
    console.log(quantities);
  }, [cartCtx.items]);

  const increaseQuantityHandler = (itemName) => {
    const updatedQuantities = { ...itemQuantities };
    updatedQuantities[itemName] = {
      quantity: (updatedQuantities[itemName].quantity) + 1,
      price: updatedQuantities[itemName].price,
    };
    setItemQuantities(updatedQuantities);
  };

  const decreaseQuantityHandler = (itemName) => {
    const updatedQuantities = { ...itemQuantities };
    updatedQuantities[itemName] = {
      quantity: updatedQuantities[itemName].quantity - 1,
      price: updatedQuantities[itemName].price,
    };
    if (updatedQuantities[itemName].quantity === 0) {
      cartCtx.removeItem(itemName);    
    }
    setItemQuantities(updatedQuantities);
  };


  const cartItems = (
    <ul className={classes['cart-items']}>
      {Object.keys(itemQuantities).map((itemName) => (
        <li key={itemName}>
          <div className={classes['cart-modal']}>
            <div className={classes['cart-itemname']}>
              <div>{itemName}</div>
              <div>{+itemQuantities[itemName].quantity}</div>
            </div>
            <div className={classes['actions']}>
              <button className={classes['actions button']} onClick={()=>decreaseQuantityHandler(itemName)}>-</button>
              <button className={classes['actions button']} onClick={() => increaseQuantityHandler(itemName)}>+</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  let totalPrice = 0;
  Object.keys(itemQuantities).forEach((itemName) => {
    const item = itemQuantities[itemName];
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
