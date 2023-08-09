import { createContext, useEffect, useState ,useReducer} from "react";

//in all of our helper function we need to return new javascript array of objects we cannot mutate them as our function will not recognize them as a change in context and react inturn will not render them again 
//helper funtion
const addCartItem = (cartItems, productToAdd) => {
  //find  if cartItems contains productToAdd

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
   //If found increment Quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return new array with modified cartItems
  //if this cart does no have our added  product we need to set up a new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
  //helper function
const removeCartItem=(cartItems,cartItemToRemove)=>{
    //find the cart item to remove 
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //check if quantity is equal to 1 if yes remove the item from the cart
    if(existingCartItem.quantity===1){
    //filter gives us the array elements that will evaluate to  true to the function inside our callback so when our cartItem.id will not be equal to the one we want to remove
      return cartItems.filter((cartItem)=> cartItem.id !== cartItemToRemove.id );
    }

    //return back cartItems with matching cartItem with reduced quantity
    if (existingCartItem) {
      
      return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    }
  }

  //helper function
const clearCartItem=(cartItems,cartItemToClear)=>{
    return cartItems.filter((cartItem)=> cartItem.id !== cartItemToClear.id );
  }

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount:0,
  removeItemFromCart:()=>{},
  clearItemFromCart:()=>{},
  total:0
});



//this is the initial state 
const INITIAL_STATE={
  isCartOpen:false,
  cartItems:[],
  cartCount:0,
  cartTotal:0,
}


//our objective is to make one funcion that will update the cartItems cartCOUNT CARTtOTAL simultaenoulsy what we can do is create a dispatch function updateCartReducer and we can pass an type of 'SET_CART_ITEMS'  and pass our required values as payload
const cartReducer=(state,action)=>{
  const {type,payload}=action;

  switch(type){
    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload
      }
    
      case 'SET_IS_CART_OPEN':
        const bool=payload
        console.log(bool)
        return {
          ...state,
          isCartOpen:bool
        } 
    
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`)
  }
    

}






export const CartProvider = ({ children }) => {
  const [{cartItems,cartCount,cartTotal,isCartOpen},dispatch]=useReducer(cartReducer,INITIAL_STATE)
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartCount,setCartCount]=useState(0);
  // const [cartItems, setCartItems] = useState([]);
  // const [total,setTotal]=useState(0);
  // useEffect(()=>{
  //   const newCartCount=cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0);
  //   setCartCount(newCartCount);
  // },[cartItems])
  
  // useEffect(()=>{
  //   const newCartTotal=cartItems.reduce((total,cartItem)=>total+cartItem.quantity*cartItem.price,0);
  //   setCartCount(newCartTotal);
  // },[cartItems])


  //cartReducer updater
  //what we are going to receive from product card is product which we want to add in our cart
  //nowe have to decide wether to increase the quantity or if the quantity of this product oreviousky was zero add this product to our cart
  const updateCartItemsReducer=(newCartItems)=>{
    
    /*
    we have to return 
    {
    newCartItems
    newCartTotal
    newCartCount
    }
    */

    const newCartCount=newCartItems.reduce((total,cartItem)=>total+cartItem.quantity,0);
    const newCartTotal=newCartItems.reduce((total,cartItem)=>total+cartItem.quantity*cartItem.price,0);
 
    dispatch({type:'SET_CART_ITEMS',payload:{
      cartItems:newCartItems,
      cartTotal:newCartTotal,
      cartCount:newCartCount
    }})

  };
  

    const addItemToCart = (productToAdd) => {
      const newcartitems=addCartItem(cartItems, productToAdd);
      updateCartItemsReducer(newcartitems)
    };
    const removeItemFromCart = (cartItemToRemove) => {
      const newcartitems=removeCartItem(cartItems, cartItemToRemove);
      updateCartItemsReducer(newcartitems)
    };
    const clearItemFromCart = (cartItemToClear) => {
      const newcartitems=clearCartItem(cartItems, cartItemToClear);
      updateCartItemsReducer(newcartitems)
    };
    const setIsCartOpen= (bool) => {
      dispatch({type:'SET_IS_CART_OPEN',payload:bool})
    };
    const value = { isCartOpen,setIsCartOpen,addItemToCart, cartItems, cartCount,removeItemFromCart,clearItemFromCart,cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
  
}







