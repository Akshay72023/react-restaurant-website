// Import the CSS module
import classes from './MealItem.module.css';

// MealItem component
const MealItem = (props) => {
  // Format the price with two decimal places
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      {/* The following div is empty - you can add content here if needed */}
      <div></div>
    </li>
  );
};

// Export the component
export default MealItem;
