import './product_card_styles.scss';
import {useNavigate} from 'react-router-dom';
import Button from '../button/button_component';
import { useDispatch,useSelector } from 'react-redux';
import { selectCartItems } from '../../cart/cart_selector';
import { addItemToCart } from '../../cart/cart_action';
import {AiOutlineHeart} from 'react-icons/ai'
// import { CartContext } from '../../context/cart_context';
// import { useContext } from 'react';
import Rating from '../rating/rating_component';
import { Fragment } from 'react';
const ProductCard=({product})=>{
   
    const {name,price,image,rating,numReviews,_id,countInStock}=product;
    console.log(countInStock)
    // const {addItemToCart}=useContext(CartContext);
    const cartItems=useSelector(selectCartItems)
    const dispatch=useDispatch()
   
    const addProductToCart=()=>{
        // console.log("jo product jaraha hai cart mai ",product)
    dispatch(addItemToCart(cartItems,product))
    }
    const navigate=useNavigate();
    const goToProductViewHandler=()=>{
        //only thing that seperates absolute path in react to relative path is the /  
        navigate(`/products/${_id}`);
    }

    const alert=()=>{
        window.alert('We will notify you once this item is in stock')
    }
    return(
    <div className="mr-7">
 {/*change imagUrl to image */}
        <div className="relative w-full group">
        {/*try to slow the hover*/}
        {countInStock>0?
            <Fragment>
            <button className="bg-black hidden group-hover:block button rounded-sm md:w-[192px] md:h-[30px] text-lato text-white absolute bottom-7 ml-8" onClick={()=>addProductToCart(product)}>ADD TO CART</button>
            </Fragment>
            :
            <Fragment>
            <button  className="bg-black hidden  group-hover:block button rounded-sm md:w-[192px] md:h-[30px] text-lato text-white absolute bottom-7 ml-8 " onClick={alert}>NOTIFY ME</button>
            </Fragment>
        }
        <img onClick={goToProductViewHandler} className=" md:w-[440px] md:h-[460px] cursor-pointer rounded-sm" src={image} alt={`${name}`}/>
        </div>
       
        <div>
            <div  className="flex w-full">
                <p className="mb-0 w-11/12 text-lg text-[#404040] leading-6 tracking-tight font-bold">{name}</p>
                <AiOutlineHeart className= 'mt-1 text-xl'></AiOutlineHeart>    
            </div>
            <p className="font-normal text-[#075245] tracking-tight text-sm">Rs.{price}</p>
        </div>

        
    </div>
    );
}

export default ProductCard;