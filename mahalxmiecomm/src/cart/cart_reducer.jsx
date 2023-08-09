import { CART_ACTION_TYPES } from './cart_types';

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  shippingAddress:{},
  paymentMethod:'',
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SAVE_SHIPPING_ADDRESS:
        return {
          ...state,
          shippingAddress: payload,
        };
    case CART_ACTION_TYPES.SAVE_PAYMENT_METHOD:
          return {
            ...state,
            paymentMethod: payload,
          };
    case CART_ACTION_TYPES.SAVE_PAYMENT_METHOD:
      return CART_INITIAL_STATE
    
    case CART_ACTION_TYPES.CLEAR_CART_ITEMS:
        return {
          ...state,
          cartItems:[],
          isCartOpen:false,
        };
    default:
      return state;
  }
};