import axios from 'axios';

import history from '../history';
import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  RESET_PRODUCT,
} from '../types/product';

export const fetchProduct = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });

  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (id, formValues) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });

  try {
    const { data } = await axios.put(`/api/products/${id}`, formValues, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });

    setTimeout(() => {
      dispatch({ type: RESET_PRODUCT });
      history.push('/admin/productList');
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const createProductReview = (id, formValues) => async (
  dispatch,
  getState
) => {
  dispatch({ type: CREATE_PRODUCT_REVIEW_REQUEST });

  try {
    const { data } = await axios.post(
      `/api/products/${id}/reviews`,
      formValues,
      {
        headers: { Authorization: `Bearer ${getState().auth.user.token}` },
      }
    );

    dispatch({ type: CREATE_PRODUCT_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
