import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React from "react";
import Container from "../../components/Container";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import { routeName } from "../../constants/routeName";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
const More = ({ navigation }) => {
  const logout = () => {
    Alert.alert("Logout", "Confirm Logout", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.dispatch(StackActions.replace("LOGIN"));
        },
      },
    ]);
  };
  const Data = [
    {
      title: "My Profile",
      icon: globalPath.profile,
      route: () => navigation.navigate(routeName.PROFILE)
    },
    // {
    //   title: "home",
    //   icon: globalPath.home,
    // },
    {
      title: "Orders",
      icon: globalPath.orders,
      route: () => navigation.navigate(routeName.MY_ORDERS)
    },
    // {
    //   title: "My Cart",
    //   icon: globalPath.cart,
    // },
    // {
    //   title: "Order Tracking",
    //   icon: globalPath.tracking,
    // },
    {
      title: "Card Management",
      icon: globalPath.card_management,
      route: () => navigation.navigate(routeName.CARD_MANAGEMENT)
    },
    {
      title: "Logout",
      icon: globalPath.logout,
      route: () => { logout() }
    },
  ];
  return (
    <Container more>
      {Data.map((item) => (
        <TouchableOpacity onPress={item.route} style={styles.listView}>
          <Icon source={item.icon} tintColor={colors.black} />
          <ResponsiveText margin={[0, 0, 0, 10]}>{item.title}</ResponsiveText>
        </TouchableOpacity>
      ))}
    </Container>
  );
};

export default More;

const styles = StyleSheet.create({
  listView: {
    flexDirection: "row",
    padding: 15,
    paddingHorizontal: wp(5),
    width: wp(90),
    backgroundColor: colors.white,
    alignSelf: "center",
    marginTop: hp(2),
    borderRadius: 10,
    elevation: 9,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
