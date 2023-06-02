import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routeName } from "../constants/routeName";
import CartList from "../screens/Cart/CartList";
import Checkout from "../screens/Cart/Checkout";
import PaymentSuccess from "../screens/Cart/PaymentSuccess";

const Stack = createNativeStackNavigator();

function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.CART_LIST}
    >
      <Stack.Screen name={routeName.CART_LIST} component={CartList} />
      <Stack.Screen name={routeName.CHECKOUT} component={Checkout} />
      <Stack.Screen name={routeName.PAYMENT_SUCCESS} component={PaymentSuccess} />
     
    </Stack.Navigator>
  );
}

export default CartStack;
