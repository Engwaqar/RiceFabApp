// import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { useRef } from "react";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import Icon from "../components/Icon";
import HomeStack from "./HomeStack";
import OrderStack from "./OrderStack";
import { routeName } from "../constants/routeName";
import CartStack from "./CartStack";
import MoreStack from "./MoreStack";
import OrderTracking from "../screens/Home/OrderTracking";
import ResponsiveText from "../components/RnText";
import { useDispatch, useSelector } from "react-redux";
const Tab = createBottomTabNavigator();

// Hiding Tab Names...
export default function BottomTabs() {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.userReducers.cartList.data);
  console.log("cartList", cartList);
  const result = Object.keys(cartList).length > 0 ? cartList.objGetAllOrderDetail.length : null;
  console.log('first', result)
  // Animated Tab Indicator...
  // const tabOffsetValue = useRef(new Animated.Value(0)).current;
  // const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     () => {
  //       setKeyboardVisible(true); // or some other action
  //     }
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     "keyboardDidHide",
  //     () => {
  //       setKeyboardVisible(false); // or some other action
  //     }
  //   );

  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        style={{ marginHorizontal: 10 }}
        // sceneContainerStyle={{marginHorizontal:20,backgroundColor:'red'}}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.white,

          // Floating Tab Bar...
          // tabBarLabelStyle: {
          //   fontSize: 10,
          //   fontWeight: "bold",
          // },
          tabBarStyle: {
            backgroundColor: colors.primary,
            shadowColor: colors.black,
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 40,
              height: 90,
            },
          },
          //  }
        }}
      >
        <Tab.Screen
          name={"Home"}
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <Icon
                source={globalPath.home}
                tintColor={focused ? colors.secondary : colors.white}
              />
            ),
          }}
        />
        <Tab.Screen
          name={"OrderTracking"}
          component={OrderTracking}
          options={{
            tabBarLabel: "Order Tracking",
            tabBarIcon: ({ focused }) => (
              <Icon
                source={globalPath.tracking}
                tintColor={focused ? colors.secondary : colors.white}
              />
            ),
          }}
        />
        <Tab.Screen
          name={"OrderStack"}
          component={OrderStack}
          options={{
            tabBarLabel: "My Orders",
            tabBarIcon: ({ focused }) => (
              <Icon
                source={globalPath.orders}
                tintColor={focused ? colors.secondary : colors.white}
              />
            ),
          }}
        />
        <Tab.Screen
          name={'CartStack'}
          component={CartStack}
          options={{
            tabBarLabel: "Cart",
            tabBarBadge:result,
            tabBarIcon: ({ focused }) => (
              <View >
                <Icon styles={{ top: 11 }}
                  source={globalPath.cart}
                  tintColor={focused ? colors.secondary : colors.white}
                />
                
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={'MoreStack'}
          component={MoreStack}
          options={{
            tabBarLabel: "More",
            tabBarIcon: ({ focused }) => (
              <Icon
                source={globalPath.more}
                tintColor={focused ? colors.secondary : colors.white}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ActiveTab: {
    width: 60,
    height: 60,
    backgroundColor: colors.blue1,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom:30
    // marginBottom: Platform.OS == "android" ?80 : 30
  },
  inActiveTab: {},
  TouchableTab: {
    backgroundColor: "white",
    padding: 2,
    width: 65,
    bottom: 20,
    height: 65,
    borderRadius: 30,
    alignItems: "center",
  },
});
