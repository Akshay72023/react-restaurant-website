import Input from '../../UI/Input';
import classes from './MealItemFrom.module.css';
import CartContext from '../../../store/cart-context';
import { useContext } from 'react';

const MealItemForm=(props)=>{
    const cartCtx=useContext(CartContext);
    const addItemToCart=(event)=>{
        event.preventDefault();
        // cartCtx.items.push(props.items);
        const quantity= document.getElementById('amount_' + props.id).value;
        cartCtx.addItem({...props.items,quantity:quantity});
        // console.log(cartCtx);
    };
    return <form className={classes.form}>
        {/* {console.log('HIII',cartCtx.items)} */}
        <Input label="Amount"  input={{
            id:'amount_' + props.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
            }}></Input>
        <button onClick={addItemToCart}>+Add</button>
    </form>
};

export default MealItemForm;