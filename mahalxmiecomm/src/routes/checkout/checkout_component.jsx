import "./checkout_styles.scss";
import { Fragment, useContext } from "react";
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectCartItems,selectCartTotal } from "../../cart/cart_selector";
// import { CartContext } from "../../context/cart_context";
import CheckoutItem from "../checkout-item/checkout_item_component";
import { Button } from "react-bootstrap";
//button for shipping asap subah
const Checkout = () => {
  const navigate=useNavigate();
  function handleClick(){
    navigate('/shipping');
  }
  // const { cartItems,addItemToCart,removeItemFromCart ,total} = useContext(CartContext);
  const cartItems=useSelector(selectCartItems);
  const cartTotal=useSelector(selectCartTotal);
  return (
    <Fragment>
    <div>
    <div className="checkout-container">
    <div className="checkout-header">
        <div className="header-blocks">
            <span>Product</span>
        </div>
        <div className="header-blocks">
            <span>Description</span>
        </div>  
        <div className="header-blocks">
            <span>Quantity</span>
        </div>  
        <div className="header-blocks">
            <span>Price</span>
        </div>  
        <div className="header-blocks">
            <span>Remove</span>
        </div> 
    </div>
      
    
        {cartItems.map((cartItem) => {
         
          return (
            <CheckoutItem key={cartItem.id} cartItem={cartItem}> </CheckoutItem>
          );
        })}
     <div className="total">Total:{cartTotal}</div>
     <div className='shipping-button'> 
    {(cartItems.length !=0)?(<Button type='button'  onClick={handleClick} >SHIPPING</Button>):(<Fragment></Fragment>)}
    </div>
    </div>
    
  </div>
     </Fragment>

  );
};

export default Checkout;
