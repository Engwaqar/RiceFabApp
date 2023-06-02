import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routeName } from "../constants/routeName";
import Home from "../screens/Home/Dashboard/Home";
import ProductDetail from "../screens/Home/ProductDetail";
import Profile from "../screens/More/Profile";
import CartList from "../screens/Cart/CartList";
import Checkout from "../screens/Cart/Checkout";
import PaymentSuccess from "../screens/Cart/PaymentSuccess";
import MyOrders from "../screens/Orders/MyOrders";
import OrderDeatail from "../screens/Orders/OrderDeatail";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.DASHBOARD}
    >
      <Stack.Screen name={routeName.DASHBOARD} component={Home} />
      <Stack.Screen name={routeName.PRODUCT_DETAIL} component={ProductDetail} />
      <Stack.Screen name={routeName.PROFILE} component={Profile} />
      <Stack.Screen name={routeName.CART_LIST} component={CartList} />
      <Stack.Screen name={routeName.CHECKOUT} component={Checkout} />
      <Stack.Screen name={routeName.PAYMENT_SUCCESS} component={PaymentSuccess} />
      <Stack.Screen name={routeName.MY_ORDERS} component={MyOrders} />
      <Stack.Screen name={routeName.ORDER_DETAIL} component={OrderDeatail} />






     
    </Stack.Navigator>
  );
}

export default HomeStack;
