import React from 'react';
import BuildControl from './BuildControl/buildControl';
import classes from './buildControls.module.css';

const controls = [
  {label: 'Salad', type: 'salad' },
  {label: 'Bacon', type: 'bacon' },
  {label: 'Cheese', type: 'cheese' },
  {label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    Current Price<strong>{props.price.toFixed(2)}</strong>
    {controls.map(ctrl => (
      <BuildControl 
        key={ctrl.label} 
        label={ctrl.label} 
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}/>
    ))}
    <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>COMPLETE YOUR SANDY</button>
  </div>
);


export default buildControls;