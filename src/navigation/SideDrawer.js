import * as React from "react";
import Icon from "../components/Icon";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { routeName } from "../constants/routeName";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { hp, wp } from "../helpers/Responsiveness";
import Home from "../screens/Home/Dashboard/Home";
const DrawerTab = createDrawerNavigator();

export default function StudentDrawer(props) {
  return (
    <DrawerTab.Navigator
      screenOptions={({ route }) => ({
        drawerStyle: {
          backgroundColor: colors.white,
          width: wp(70),
        },
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === routeName.DASHBOARD) {
            iconName = globalPath.home;
          }

          // You can return any component that you like here!
          return <Icon source={iconName} size={size} tintColor={color} />;
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.black,
        drawerActiveBackgroundColor: colors.grey,
        headerShown: false,
      })}
    >
      <DrawerTab.Screen
        name={routeName.DASHBOARD}
        component={Home}
        options={{
          title: "Dashboard",
        }}
      />
    </DrawerTab.Navigator>
  );
}
