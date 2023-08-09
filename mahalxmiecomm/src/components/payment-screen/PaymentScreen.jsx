import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../cart/cart_action";
import FormContainer from "../form-container/FormContainer";
import CheckoutSteps from "../checkout-steps/CheckoutSteps";
import { savePaymentMethod } from "../../cart/cart_action";
function PaymentScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const {shippingAddress}=cart
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  if (!shippingAddress.address) {
    navigate("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
  
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder");
  };
  return (
    <FormContainer>
    
      <CheckoutSteps step1 step2 step3>  </CheckoutSteps>
     
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method </Form.Label>
                <Col>
                <Form.Check 
                type='radio'
                label='Paypal or Credit Card'
                id='paypal'
                name='paymentMethod'
                checked
                // onChange={(e)=>setPaymentMethod(e.target.value)}
                >
                
                </Form.Check>
                <Form.Check 
                type='radio'
                label='Paytm'
                id='paytm'
                name='paymentMethod'
         
                // onChange={(e)=>setPaymentMethod(e.target.value)}
                >
                
                </Form.Check>
                <Form.Check 
                type='radio'
                label='Upi'
                id='Upi'
                name='paymentMethod'
         
                // onChange={(e)=>setPaymentMethod(e.target.value)}
                >
                
                </Form.Check>
                
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
            Continue
            </Button>
        </Form>
    
    </FormContainer>
  );
}

export default PaymentScreen;