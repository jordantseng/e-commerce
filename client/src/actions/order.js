import axios from '../axios';
import history from '../history';
import { RESET_CART_ITEM } from '../types/cart';
import {
  FETCH_MY_ORDER_REQUEST,
  FETCH_MY_ORDER_SUCCESS,
  FETCH_MY_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  UPDATE_ORDER_PAY_REQUEST,
  UPDATE_ORDER_PAY_SUCCESS,
  UPDATE_ORDER_PAY_FAIL,
} from '../types/order';

export const fetchMyOrder = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_MY_ORDER_REQUEST });

  try {
    const { data } = await axios.get(`/api/orders/${id}`);

    dispatch({ type: FETCH_MY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_MY_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await axios.post('/api/orders', order);

    dispatch({ type: CREATE_ORDER_SUCCESS });

    dispatch({ type: RESET_CART_ITEM });
    localStorage.removeItem('cartItems');

    history.push(`/orders/${data._id}`);
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateOrderToPaid = (id, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: UPDATE_ORDER_PAY_REQUEST });

  try {
    const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult);

    dispatch({ type: UPDATE_ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
