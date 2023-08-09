import { createAction } from '../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart_types';

const addCartItem = (cartItems, productToAdd) => {
  console.log("yaha pe hun mai",cartItems)
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === productToAdd._id
  );

  if (existingCartItem) {
    if(existingCartItem.category !== "Camera" && existingCartItem.countInStock > existingCartItem.quantity + 1){
      return cartItems.map((cartItem) =>
       cartItem._id === productToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
       );
    }
    else{
      return cartItems;
    }
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem._id !== cartItemToRemove._id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem._id !== cartItemToClear._id);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const saveShippingAddress=(data)=>(dispatch)=>{
    dispatch({
        type:CART_ACTION_TYPES.SAVE_SHIPPING_ADDRESS,
        payload:data
    })
    
}
export const savePaymentMethod=(data)=>(dispatch)=>{
  dispatch({
      type:CART_ACTION_TYPES.SAVE_PAYMENT_METHOD,
      payload:data
  })
  
}

export const clearCart=()=>(dispatch)=>{
  dispatch({
      type:CART_ACTION_TYPES.CLEAR_CART_ITEMS,
  })
  
}


