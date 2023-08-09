import './cart_dropdown_styles.scss';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../cart/cart_selector';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
// import { useContext } from 'react';
import CartItem from '../cart-item/cart_item_component';
// import { CartContext } from '../../context/cart_context';
const CartDropDown=()=>{
    // const {cartItems}=useContext(CartContext);
    const cartItems=useSelector(selectCartItems)
    const navigate=useNavigate();
    const goToCheckOutHandler=()=>{
        navigate('/checkout');
    }

return (
    <div className='cart-dropdown-container'>
    <div className='cart-items'>
    {/*we know that we need to traverse through some array which is a variation of products  */}
        {cartItems.map((item)=>{
            return(<CartItem key={item._id} cartItem={item}></CartItem>);
        })}
    </div>
    <Button onClick={goToCheckOutHandler}>GO TO CART</Button>
    
    </div>
    );
}
export default CartDropDown;