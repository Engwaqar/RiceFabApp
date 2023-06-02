import types from "./types";
//LOGIN
export const loginUser = (data) => {
  return {
    type: types.LOGIN_USER_REQUEST,
    data: data,
  };
};

//PROFILE
export const getProfile = (data) => {
  return {
    type: types.GET_PROFILE_REQUEST,
    data: data,
  };
};

//PROFILE
export const getProducts = (data) => {
  return {
    type: types.GET_PRODUCTS_REQUEST,
    data: data,
  };
};
//PROFILE
export const getCartList = (data) => {
  return {
    type: types.GET_CART_LIST_REQUEST,
    data: data,
  };
};

//CARD
export const getAllCard = (data) => {
  return {
    type: types.GET_ALL_CARD_REQUEST,
    data: data,
  };
};
//CARD
export const getAllOrders = (data) => {
  return {
    type: types.GET_ALL_ORDERS_REQUEST,
    data: data,
  };
};