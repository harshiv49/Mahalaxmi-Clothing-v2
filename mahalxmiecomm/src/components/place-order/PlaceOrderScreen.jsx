import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectCartTotal } from "../../cart/cart_selector";
import { createOrder } from "../../actions/orderCreateAction";

import {
  Button,
  Row,
  ListGroup,
  Image,
  Card,
  Col,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../cart/cart_action";
import FormContainer from "../form-container/FormContainer";
import CheckoutSteps from "../checkout-steps/CheckoutSteps";
import { Link } from "react-router-dom";
import Message from "../message/message";
import { clearCart } from "../../cart/cart_action";


function PlaceOrder() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector(selectCartTotal);
  const shippingPrice=(cartTotal>100?0:10).toFixed(2)
  const taxPrice=((0.082)*cartTotal).toFixed(2)
  const priceToPay=parseFloat(taxPrice)+parseFloat(cartTotal)+parseFloat(shippingPrice)
  const { cartItems,shippingAddress,paymentMethod } = cart;
  
  const placeOrder=()=>{
    
    dispatch(createOrder({
      orderItems:cartItems,
      shippingAddress:shippingAddress,
      paymentMethod:paymentMethod,
      taxPrice:taxPrice, 
      shippingPrice:shippingPrice,
      priceToPay:priceToPay,
    }))
  }
 
  const orderCreate=useSelector(state=>state.orderCreate)
  const {order,error,success}=orderCreate 
  useEffect(()=>{
    if(!paymentMethod){
      navigate('/payment')
    }
  },[paymentMethod,navigate])

  useEffect(()=>{
    if(success){
      navigate(`/order/${order._id}`)
      dispatch({type:'ORDER_CREATE_RESET'})
      dispatch(clearCart())
    }
  },[dispatch,success,navigate,order])
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.state}
                {"  "}
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your Cart is empty</Message>
              ) : (
                <ListGroup variaint="flush">
                  {cartItems.map((item) => {
                    return (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {" "}
                              {item.name}{" "}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.quantity} X ${item.price}=$
                            {(item.price * item.quantity).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>${cartTotal}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${priceToPay.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
              {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>


            
              <ListGroup.Item>
              
                <Button
                  typr="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default PlaceOrder;
