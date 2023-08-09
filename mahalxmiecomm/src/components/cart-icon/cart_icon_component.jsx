import './cart_icon_styles.scss'
import { ReactComponent as ShoppingCart } from '../../assets/shopping-bag.svg';
// import { CartContext } from '../../context/cart_context';
// import { useContext } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import { selectCartCount,selectIsCartOpen } from '../../cart/cart_selector';
import { setIsCartOpen  } from '../../cart/cart_action';
const CartIcon=()=>{
    // const {cartCount}=useContext(CartContext);
    const dispatch=useDispatch()
    const cartCount=useSelector(selectCartCount)
    
    const isCartOpen=useSelector(selectIsCartOpen) 
    // const {isCartOpen,setIsCartOpen}=useContext(CartContext);
    const setToggle=function(){
        console.log('here is the problem',isCartOpen)
        dispatch(setIsCartOpen(!isCartOpen))
    }
    return(
        <div className='cart-icon-container' onClick={setToggle}>
        Bag<ShoppingCart className="shopping-icon"/>
        <span className='item-count'>{cartCount}</span>
        </div>

    );

}
export default CartIcon;