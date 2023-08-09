import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminListOrders } from "../../actions/orderCreateAction";
import FormContainer from "../form-container/FormContainer";
import Loader from "../loader/loader";
import Message from "../message/message";

function AdminOrderListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ordersAll = useSelector((state) => state.adminOrderList);
  const { loading,error,orders } = ordersAll;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(adminListOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (

    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table stripped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  {console.log(order.user)}
                  <td>{order.user && order.user.username}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                   <td>

                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-check" style={{ color: "red" }}></i>
                    )}
                    </td>

                  <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
            
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}
export default AdminOrderListScreen;
