import types from "../actions/types";

//Get site data from url reducer
const initialState = {
  status: null,
  message: null,
  error: false,
  loginScreen: {
    refreshing: false,
    data: {
      loggedInUserId: null,
      loggedInUserName: "",
      loggedInUserTypeId: "",
      message: null,
    },
  },
  profileData: {
    refreshing: false,
    data: {},
  },
  productData: {
    refreshing: false,
    data: [],
  },
  cartList: {
    refreshing: false,
    data: {},
  },
  allCards: {
    refreshing: false,
    data: [],
  },
  allOrders: {
    refreshing: false,
    data: [],
  },
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: true,
        },
      };

    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.LOGIN_USER_FAILURE:
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: false,
          data: action.payload,
          errorMsg: action.error,
        },
      };
    //Profile
    case types.GET_PROFILE_REQUEST:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          refreshing: true,
        },
      };

    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_PROFILE_FAILURE:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          refreshing: false,
          errorMsg: action.error,
        },
      };
    //Products
    case types.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        productData: {
          ...state.productData,
          refreshing: true,
        },
      };

    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productData: {
          ...state.productData,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        productData: {
          ...state.productData,
          refreshing: false,
          errorMsg: action.error,
        },
      };
    //cart
    case types.GET_CART_LIST_REQUEST:
      return {
        ...state,
        cartList: {
          ...state.cartList,
          refreshing: true,
        },
      };

    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_CART_LIST_FAILURE:
      return {
        ...state,
        cartList: {
          ...state.cartList,
          refreshing: false,
          data: {},

          errorMsg: action.error,
        },
      };

    //CARDs
    case types.GET_ALL_CARD_REQUEST:
      return {
        ...state,
        allCards: {
          ...state.allCards,
          refreshing: true,
        },
      };

    case types.GET_ALL_CARD_SUCCESS:
      return {
        ...state,
        allCards: {
          ...state.allCards,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_ALL_CARD_FAILURE:
      return {
        ...state,
        allCards: {
          ...state.allCards,
          refreshing: false,
          errorMsg: action.error,
        },
      };

    //ORDERS
    case types.GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        allOrders: {
          ...state.allOrders,
          refreshing: true,
        },
      };

    case types.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        allOrders: {
          ...state.allOrders,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        allOrders: {
          ...state.allOrders,
          refreshing: false,
          errorMsg: action.error,
        },
      };

    default:
      return state;
  }
};
