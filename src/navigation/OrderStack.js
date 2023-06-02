import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import ProductDetail from "../screens/Home/ProductDetail";
import MyOrders from "../screens/Orders/MyOrders";
import OrderDeatail from "../screens/Orders/OrderDeatail";

const Stack = createNativeStackNavigator();

function OrderStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.MY_ORDERS}
    >
      <Stack.Screen name={routeName.MY_ORDERS} component={MyOrders} />
      <Stack.Screen name={routeName.ORDER_DETAIL} component={OrderDeatail} />
     
    </Stack.Navigator>
  );
}

export default OrderStack;
