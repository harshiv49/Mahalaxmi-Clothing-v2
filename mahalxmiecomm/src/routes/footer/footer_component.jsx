import { Fragment } from "react";
import "./footer_component_style.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";


// import { Link } from "react-router-dom";
// import PaymentLogo from "../../assets/payment gateway.png";
// import {Container,Row,Col} from 'react-bootstrap';
// import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
// const myStyle = {

//   paddingLeft: "35px",

// };
const Footer = () => {
  return (
    <Fragment>
      <Outlet />
{/*
<footer className="footer-section">
    <div class="footer-column1">
         <CrwnLogo className="logo"/>
        <h3>Contact</h3>
        <p><strong>Address1:</strong>Lg 40, Abhinandan Ac Market,Ghod Dod Road ,Near Rangilla Park, Surat</p>
        <p><strong>Address2:</strong>Lavanya Shopping Mall, Near Ashok Pan House, CityLight, Surat</p>
        <p><strong>Phone:</strong>9327047019</p>
        <p><strong>Hours:</strong>Morning:11:00am to 9:00pm </p>
        <div className="follow-section">
            <h3 className="followUs-heading">Follow Us</h3>
            <div className="follow-icon" >
               <Link to="https://www.whatsapp.com/" target="_blank"><i class="fa-brands fa-whatsapp"></i></Link>
               <Link to="https://www.instagram.com/" target="_blank"><i class="fa-brands fa-instagram"></i></Link> 
               <Link  to="https://www.facebook.com/" target="_blank"><i class="fa-brands fa-facebook"></i></Link>
            </div>
        </div>

    </div>
   
    <div  className="footer-column2">
        <h4 className="footer-subheadings">About</h4>
        <ul>
        <li><Link to="#">About Us</Link></li>
        <li><Link to="#">Delivery Informations</Link></li>
        <li><Link to="#">Privacy Policy</Link></li>
        <li><Link to="#">Terms and Conditions</Link></li>
        <li><Link to="#">Contact Us </Link></li>
    </ul>

    </div>

    <div  className="footer-column2" >
        <h4 className="footer-subheadings">My account </h4>
        <ul>
        <li><Link to="#" >Sign In</Link></li>
        <li><Link to="#">View Cart</Link></li>
        <li><Link to="#">My WishList</Link></li>
        <li><Link to="#">Track My orders</Link></li>
        <li><Link to="#">Helps</Link></li>
    </ul>

    </div>

    
    <div  className="footer-column2 payment">
        <h4  className="footer-subheadings">Payments</h4>
        <p style={myStyle}>Secured Payment Gateways</p>
        <img src={PaymentLogo} className="payment-logo" alt='payment-logo'></img>
    </div>

    
</footer>
<Container>
      <Row>
        <Col className="text-center">Copyright &copy; Mahalaxmi Matching Center</Col>
      </Row>
    </Container>
    */}

    {/*always handle multiple scree dimensions*/}
    <div className="box-border w-full md:h-[692px] bg-teal-800  md:pt-[75px] md:px-[200px] text-white"> 
      <div className="md:h-[500px]" >
        <div>
          <div className="flex justify-between">
            {/*shop*/}
            <div>
              <h4 className="text-sm leading-5 tracking-tight font-extrabold text-white font-lato">SHOP</h4>
              {/*font family has to be made lato*/}
              <ul  className="px-0">
                <li className="text-sm leading-5 tracking-tight font-bold font-lato">Dupattas</li>
                <li className="text-sm leading-5 tracking-tight font-medium">Bottomwear</li>
              </ul>
            </div>
            {/*information*/}
            <div>
              <h4 className="text-sm leading-5 tracking-tighter font-bold text-white">INFORMATION</h4>
                <ul className="px-0">
                  <li className="text-sm leading-5 tracking-tight font-medium">About Us</li>
                  <li className="text-sm leading-5 tracking-tight font-medium">Newsletter</li>
                </ul>
            </div>
            {/*help&support*/}
            <div>
            <h4 className="text-sm leading-5 tracking-tighter font-bold text-white">HELP & SUPPORT</h4>
                <ul className="px-0">
                 <li className="text-sm leading-5 tracking-tight font-medium">Customer Service</li>
                 <li className="text-sm leading-5 tracking-tight font-medium">Offline Store</li>
                 <li className="text-sm leading-5 tracking-tight font-medium">Legal Store & Privacy Policy</li>
                 <li className="text-sm leading-5 tracking-tight font-medium">Contact Us</li>
                 <li className="text-sm leading-5 tracking-tight font-medium">Seek Help</li>
                 <li className="text-sm leading-5 tracking-tight font-medium">Cookie Settings</li>
                </ul>
            </div>
            {/*Sign Now*/}
            <div>
              <p className="h-[45px] w-[295px] mb-10">Sign up now and be the first to know about exclusive offers, our launches & style tips!</p>
              <Link to="/" className="text-sm leading-5 tracking-tight font-medium text-white ">Read More</Link>
            </div>
          </div>
          {/*icons*/}
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
    </Fragment>
  );
};
export default Footer;
