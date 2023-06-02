// live hosts

export default urls = {
  HOST: "https://organicrice.egreatminds.com/WebApi/api/",
  BASE_URL: "https://organicrice.egreatminds.com/WebApi/api/",

  //Login
  LOGIN: "Auth/Login",
  REGISTER: "Auth/Register",
  GET_PROFILE:'Auth/GetProfileData',
  GET_BANNERS:'SlideShow/GetAllSlideShows',
  GET_PRODUCTS:'Item/GetAllItems',
  ADD_TO_CART:'Order/AddToCartCall',
  CART_LIST:'Order/GetCartList',
  EDIT_CART_ITEM:'OrderDetail/EditCartList/',
  DELETE_CART_ITEM:'OrderDetail/DeleteCartItem/',
  ALL_CARDS:'Card/GetAllCardsList',
  ADD_CARD:'Card/AddCardInfo',
  EDIT_CARD:'Card/EditCardInfo',
  DELETE_CARD:'Card/DeleteCardInfo/',
  PROCESS_ORDER:'Order/ProcessOrder',
  DELIVERY_DAYS:'OrderDetail/GetDeliveryDayList',
  DELIVERY_TIMES:'OrderDetail/GetDeliveryTimeList',
  ALL_ORDERS:'Order/GetAllOrdersList',
  RAPEAT_ORDERS:'Order/RepeatOrder/',
  FORGOT_PASSWORD_BY_NUMBER:'Auth/GetUserIdByNumber/',
  VERIFICATION_CODE:'Auth/VerifyUserOtp/',
  FORGET_PASSWORD:'Auth/ChangePassword/'



 
};
