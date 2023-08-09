import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../cart/cart_action";
import FormContainer from "../form-container/FormContainer";
import CheckoutSteps from "../checkout-steps/CheckoutSteps";
function ShippingScreen() {
    const cart= useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const dispatch=useDispatch()
 
  const location = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [state, setStateName] = useState(shippingAddress.state);
  const [country, setCountry] = useState(shippingAddress.country);
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,state,postalCode,country}))
    navigate('/payment')
  };

  return (
    <FormContainer>
    <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            required
            type="address"
            placeholder="Enter Address"
            value={address ? address:''}
            onChange={(event) => setAddress(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>City:</Form.Label>
          <Form.Control
            required
            type="city"
            placeholder="Enter City"
            value={city ? city:''}
            onChange={(event) => setCity(event.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group controlId="name">
        <Form.Label>State:</Form.Label>
        <Form.Control
          required
          type="name"
          placeholder="Enter Username"
          value={state ? state:''}
          onChange={(event) => setStateName(event.target.value)}
        ></Form.Control>
      </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code:</Form.Label>
          <Form.Control
            required
            type="postalCode"
            placeholder="Enter Postal Code"
            value={postalCode ? postalCode:''}
            onChange={(event) => setPostalCode(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
        <Form.Label>Country:</Form.Label>
        <Form.Control
          required
          type="country"
          placeholder="Enter Country"
          value={country ? country:''}
          onChange={(event) => setCountry(event.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary'>Continue</Button>
      </Form>
     
    </FormContainer>
  );
}
export default ShippingScreen;
