import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const initialState = {cart: []};
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};
const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  const incrementQuantity = (id) => {
    const item = state.cart.find(item => item.id === id);
    if (item) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: item.quantity + 1 } });
    }
  };
  const decrementQuantity = (id) => {
    const item = state.cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: item.quantity - 1 } });
    }
  };
  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };
  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      <div className="products">
        <button onClick={() => addItemToCart({ id: 1, name: 'Apple', price: 15})}>Apple</button>
        <button onClick={() => addItemToCart({ id: 2, name: 'Banana', price: 5 })}>Banana</button>
        <button onClick={() => addItemToCart({ id: 3, name: 'Orange', price: 10 })}>Orange</button>
        <button onClick={() => addItemToCart({ id: 4, name: 'Strawberry', price: 8 })}>Strawberry</button>
        <button onClick={() => addItemToCart({ id: 5, name: 'Mango', price: 20 })}>Mango</button>
      </div>
      <div className="cart-items">
        {state.cart.length === 0 ? (
          <p class="emptycart">Your cart is empty.</p>
        ) : (
          state.cart.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: Rs.{item.price}</p>
              <p>
                Quantity: 
                <button onClick={() => decrementQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementQuantity(item.id)}>+</button>
              </p>
              <button onClick={() => removeItemFromCart(item.id)} class="remove">Remove</button>
            </div>
          ))
        )}
      </div>
      <div className="total">
        <h2>Total: Rs {state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h2>
      </div>
    </div>
  );
};
ReactDOM.render(<ShoppingCart />, document.getElementById('root'));
