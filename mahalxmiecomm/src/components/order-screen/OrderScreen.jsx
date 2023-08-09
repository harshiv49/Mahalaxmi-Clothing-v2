import {  useEffect } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "../loader/loader";
import { selectCartTotal } from "../../cart/cart_selector";

import {

  Row,
  ListGroup,
  Image,
  Card,
  Col,
  Button,

} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Message from "../message/message";


import { getOrderDetails, payOrder,deliverOrder } from "../../actions/orderCreateAction";
import { myOrderTypes } from "../../reducers/orderReducer";
import RazorpayPayment from "../razorpay/razorpayScreen";

function OrderScreen() {
 
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const cartTotal = useSelector(selectCartTotal);
  const shippingPrice = (cartTotal > 100 ? 0 : 10).toFixed(2);
  const taxPrice = (0.082 * cartTotal).toFixed(2);
  const priceToPay =
    parseFloat(taxPrice) + parseFloat(cartTotal) + parseFloat(shippingPrice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver= useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver} = orderDeliver;
  

  const userLogin= useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler=()=>{
    dispatch(deliverOrder(order))
  }

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce(
      (total, Item) => total + Item.quantity * Item.price,
      0
    );
  }

  useEffect(() => {
   if(!userInfo){
    navigate('/login')
   }
    if (!order  || order._id !== Number(orderId) || successDeliver )  {
      
      dispatch({ type: myOrderTypes.ORDER_PAY_RESET });
      dispatch({ type: myOrderTypes.ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
 
    }
  }, [order, orderId, dispatch,successDeliver,successPay,userInfo,navigate]);



  return(

    <div>
   <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>User Information</h2>

            <p>
              <strong>Name:</strong>
              {order.user.username}
            </p>
            <p>
              <strong>Email:</strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Shipping:</strong>
              {order.shippingAddress.address},{order.shippingAddress.city},
              {order.shippingAddress.state}
              {"  "}
              {order.shippingAddress.postalCode},
              {order.shippingAddress.country}
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered On {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <strong>Method:</strong>
            {order.paymentMethod}
            <p>
              {order.isPaid ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message variant="info">
                This is order with no orderItems
              </Message>
            ) : (
              <ListGroup variaint="flush">
                {order.orderItems.map((item) => {
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
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
              <ListGroup.Item>
                 <RazorpayPayment orderPrice={order.totalPrice}/>
              </ListGroup.Item>
            {loadingDeliver && <Loader/>}
           {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <ListGroup>
            <Button
            type="button"
            className="btn btn-block"
            onClick={deliverHandler}
            >
            Mark as Deliver
            </Button>
            </ListGroup>
           ) } 


          </ListGroup>
        </Card>
      </Col>
    </Row>

     
          
  </div>
  );
}
export default OrderScreen;
