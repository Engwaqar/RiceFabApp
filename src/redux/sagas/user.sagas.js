import AsyncStorage from "@react-native-community/async-storage";
import { takeLatest, put, select } from "redux-saga/effects";
import { routeName } from "../../constants/routeName";
// import { parseCats } from "../../helpers/cat.helpers";
import types from "../actions/types";
import Api from "../lib/api";
import urls from "../lib/urls";
import { StackActions } from "@react-navigation/native";
//LOGIN
export function* loginUserSaga() {
  yield takeLatest(types.LOGIN_USER_REQUEST, loginUserApi);
}
function* loginUserApi(data, response) {
  let { params, navigation } = data.data;
  try {
    const response = yield Api.post(urls.LOGIN, params);
    console.log(response, "response");
    if (response && response.data != null) {
      yield AsyncStorage.setItem("@token", response.data.token);
      yield AsyncStorage.setItem(
        "@loggedInUserTypeId",
        response.data.loggedInUserTypeId
      );
      yield AsyncStorage.setItem("@userId", response.data.loggedInUserId);
      yield AsyncStorage.setItem("@userName", response.data.loggedInUserName);
      yield put({ type: types.LOGIN_USER_SUCCESS, payload: response });
      // if (response.data.role == "Admin") {
      navigation.replace(routeName.BOTTOM_TABS);
      // }
    } else {
      yield put({ type: types.LOGIN_USER_FAILURE, payload: response });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.LOGIN_USER_FAILURE, error: error });
  }
}

//get profile
export function* getProfileDataSaga() {
  yield takeLatest(types.GET_PROFILE_REQUEST, getProfileDataApi);
}
function* getProfileDataApi(data) {

  try {
    const response = yield Api.get(urls.GET_PROFILE);
    console.log(response, "profile res");
    if (response && response.success == true) {
      yield put({ type: types.GET_PROFILE_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_PROFILE_FAILURE, payload: response.data });
    }
  } catch (error) {
    yield put({ type: types.GET_PROFILE_FAILURE, error: error });
  }
}

//get products
export function* getProductsDataSaga() {
  yield takeLatest(types.GET_PRODUCTS_REQUEST, getProductsDataApi);
}
function* getProductsDataApi(data) {

  try {
    const response = yield Api.get(urls.GET_PRODUCTS);
    console.log(response, "PRODUCTS res");
    if (response && response.success == true) {
      yield put({ type: types.GET_PRODUCTS_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_PRODUCTS_FAILURE,  });
    }
  } catch (error) {
    yield put({ type: types.GET_PRODUCTS_FAILURE, error: error });
  }
}

//get cart
export function* getcartListSaga() {
  yield takeLatest(types.GET_CART_LIST_REQUEST, getcartListApi);
}
function* getcartListApi(data) {

  try {
    const response = yield Api.get(urls.CART_LIST);
    console.log(response, "cart res");
    if (response && response.success == true) {
      yield put({ type: types.GET_CART_LIST_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_CART_LIST_FAILURE,  });
    }
  } catch (error) {
    yield put({ type: types.GET_CART_LIST_FAILURE, error: error });
  }
}
//get ALL CARDS
export function* getAllCardsSaga() {
  yield takeLatest(types.GET_ALL_CARD_REQUEST, getAllCardsApi);
}
function* getAllCardsApi(data) {

  try {
    const response = yield Api.get(urls.ALL_CARDS);
    console.log(response, "cards res");
    if (response && response.success == true) {
      yield put({ type: types.GET_ALL_CARD_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_ALL_CARD_FAILURE,  });
    }
  } catch (error) {
    yield put({ type: types.GET_ALL_CARD_FAILURE, error: error });
  }
}
//get ALL orders
export function* getAllOrdersSaga() {
  yield takeLatest(types.GET_ALL_ORDERS_REQUEST, getAllOrdersApi);
}
function* getAllOrdersApi(data) {

  try {
    const response = yield Api.get(urls.ALL_ORDERS);
    console.log(response, "orders res");
    if (response && response.success == true) {
      yield put({ type: types.GET_ALL_ORDERS_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_ALL_ORDERS_FAILURE,  });
    }
  } catch (error) {
    yield put({ type: types.GET_ALL_ORDERS_FAILURE, error: error });
  }
}

