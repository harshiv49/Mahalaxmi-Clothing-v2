import { Outlet,Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { Form } from "react-bootstrap";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
// import { CartContext } from "../../context/cart_context";
import { selectIsCartOpen } from "../../cart/cart_selector";
import './navigation_styles.scss' 
import { NavDropdown } from "react-bootstrap";
import CartIcon from "../../components/cart-icon/cart_icon_component";
import CartDropDown from "../../components/cart-dropdown/cart_dropdown_component";
import { useDispatch,useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from "../../actions/userAction";
import SearchBox from "../../components/search-box/searchBox";
import Logo from "../../assets/Group 1.png"
const  Navigation=()=>{  
    // const {isCartOpen}=useContext(CartContext)
    const isCartOpen=useSelector(selectIsCartOpen)
    const userLogin=useSelector(state=>state.userLogin)
    const dispatch=useDispatch()
    const logoutHandler=()=>{
      dispatch(logout())
    }
    const {userInfo}=userLogin
    //we can import svg file images as components 
    return(
     <Fragment>
      <div className="bg-white h-16 flex w-full z-50 sticky top-0 justify-evenly">
         <ul className="flex items-center list-none ">
          <li><Link className="no-underline text-lato text-sm font-bold mr-6" to="/">Home</Link></li>
          <li><Link className="no-underline text-lato text-sm font-bold mr-6" to="/newsletter">Newsletter</Link></li>
          <li><Link className="no-underline text-lato text-sm font-bold mr-6" to="/categories">Categories</Link></li>
          <li><Link className="no-underline text-lato text-sm font-bold " to="/aboutUs">AboutUs</Link></li>
         </ul>


         <Link className="logo-container" to="/">
               <img src={Logo} alt="MCM" className="mr-7"></img>
         </Link>
         
        
         

        
          {/*  
          <SearchBox/>
           <Link className="nav-link" to='/shop'>
           SHOP
           </Link>
        */}
         {/*
        {userInfo && !userInfo.isAdmin ?(
          <NavDropdown id='username' title={userInfo.name}>
              <LinkContainer to='/profile'>
               <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
         ):
        userInfo&&userInfo.isAdmin?(
          <Fragment>
          <NavDropdown id='username' title={userInfo.name}>
              <LinkContainer to='/profile'>
               <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>LOGOUT</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown id='admin-menu' title='Admin'>
              <LinkContainer to='/admin/userList'>
               <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productList'>
               <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderList'>
               <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
          </NavDropdown>
          </Fragment>
            
         ):(
          <Link className="nav-link" to='/login'>
         SIGN IN 
         </Link>
         )
        }
        
          */}
        
          <ul className="flex items-center list-none ">
          <li><Link className="no-underline text-lato text-sm font-bold mr-6" to="/">Search</Link></li>
          <li><Link className="no-underline text-lato text-sm font-bold mr-6" to="/checkout">Bag</Link></li>
          <li><Link className="no-underline text-lato text-sm font-bold mr-6" to="/">Wishlist</Link></li>
          <li><Link className="no-underline text-lato text-sm font-bold mr-6" to="/profile">Account</Link></li>
         </ul>
        {/* {  isCartOpen && <CartDropDown></CartDropDown>} */}
       
       </div>
       <Outlet/>
     </Fragment>
    );
}
export default Navigation;