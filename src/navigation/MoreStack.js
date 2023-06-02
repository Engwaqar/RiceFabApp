import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routeName } from "../constants/routeName";
import Home from "../screens/Home/Dashboard/Home";
import ProductDetail from "../screens/Home/ProductDetail";
import More from "../screens/More/More";
import CardManagement from "../screens/More/CardManagement";
import AddCard from "../screens/More/AddCard";
import Profile from "../screens/More/Profile";
import MyOrders from "../screens/Orders/MyOrders";
import OrderDeatail from "../screens/Orders/OrderDeatail";

const Stack = createNativeStackNavigator();

function MoreStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.MORE}
    >
      <Stack.Screen name={routeName.MORE} component={More} />
      <Stack.Screen name={routeName.CARD_MANAGEMENT} component={CardManagement} />
      <Stack.Screen name={routeName.ADD_CARD} component={AddCard} />
      <Stack.Screen name={routeName.PROFILE} component={Profile} />
      <Stack.Screen name={routeName.MY_ORDERS} component={MyOrders} />
      <Stack.Screen name={routeName.ORDER_DETAIL} component={OrderDeatail} />
     
    </Stack.Navigator>
  );
}

export default MoreStack;
