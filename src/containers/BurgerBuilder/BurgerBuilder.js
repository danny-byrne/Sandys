import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/buildControls';
import Modal from '../../components/UI/Modal/modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //     this.state = {
    
  //     }
  // }
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  }

  componentDidMount () {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
      })
      .catch(err => {
        this.setState({error: true});
      })
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0);

    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = newCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <=0) {
      return
    }
    const newCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = newCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  //any notename of your choice.json
  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Danny Byrne',
        address: {
          street: '',
          zipCode: '',
          country: '',
        },
        email: ''
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(err => {
        this.setState({loading: false, purchasing: false});
      })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if(this.state.ingredients){
      orderSummary = <OrderSummary ingredients={this.state.ingredients} 
      price = {this.state.totalPrice}
      continue= {this.purchaseContinueHandler} 
      cancel = {this.purchaseCancelHandler}/>
    }
    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />
    // }
    let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner /> ;
    if(this.state.ingredients){
      burger = (
                  <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                      ingredientAdded={this.addIngredientHandler}
                      ingredientRemoved={this.removeIngredientHandler}
                      disabled={disabledInfo}
                      price={this.state.totalPrice} 
                      purchasable={this.state.purchasable}
                      ordered={this.purchaseHandler}
                    />
                  </React.Fragment>
              );
    }

    
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
        {orderSummary}              
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);