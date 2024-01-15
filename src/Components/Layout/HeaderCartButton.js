import React,{useContext} from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton=(props)=>{
    const CartCtx=useContext(CartContext);
    let quantity=0;
    CartCtx.items.forEach(item=>{
        quantity+= +item.quantity;
    })
    return(
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{quantity}</span>
        </button>
    );
};

export default HeaderCartButton;