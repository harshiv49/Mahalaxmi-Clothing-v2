import axios from "axios";
import { myOrderTypes } from "../reducers/orderReducer";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: myOrderTypes.ORDER_CREATE_REQUEST });
    const { data } = await axios.post(
      //url left in django
      `/api/orders/add/`,
      order,
      config
    );

    dispatch({
      type: myOrderTypes.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: myOrderTypes.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: myOrderTypes.ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/orders/${id}/`, config);

    dispatch({
      type: myOrderTypes.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: myOrderTypes.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: myOrderTypes.ORDER_PAY_REQUEST });

    const { data } = await axios.put(
      `/api/orders/${id}/pay/`,
      paymentResult,
      config
    );

    dispatch({
      type: myOrderTypes.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: myOrderTypes.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: myOrderTypes.ORDER_DELIVER_REQUEST });

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver/`,
      {},
      config
    );

    dispatch({
      type: myOrderTypes.ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: myOrderTypes.ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminListOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: myOrderTypes.ORDER_ADMIN_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/`, config);

    dispatch({
      type: myOrderTypes.ORDER_ADMIN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: myOrderTypes.ORDER_ADMIN_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const listMyOrders = () => async (dispatch, getState) => {
  
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: myOrderTypes.ORDER_LIST_MY_REQUEST });

    const { data } = await axios.get(`/api/orders/myorders/`, config);

    dispatch({
      type: myOrderTypes.ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: myOrderTypes.ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};