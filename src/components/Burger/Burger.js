import React from 'react';
import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/burgerIngredient';



const burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((igKey) => {
      //
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      })
    })
    .reduce((acc, val) => {
      return acc.concat(val)
    }, [])
  if(ingredients.length === 0){
    ingredients = <p>Add some stuff!</p>
  }
  console.log(ingredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;