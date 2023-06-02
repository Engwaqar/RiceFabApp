import React, { useEffect, version } from "react";

import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";

import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import Icon from "./Icon";
const Header = ({ title ,navigation}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        padding:wp(5)
      }}
    >
      <TouchableOpacity
      onPress={() => navigation.goBack()}
      >
        <Icon size={25} source={globalPath.dashboard} />
      </TouchableOpacity>

        <ResponsiveText margin={[0,0,0,20]} color={colors.white}>{title}</ResponsiveText>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  name: {
    fontSize: hp(2),
    color: colors.white,
    textAlign: "center",
  },
  img1: {
    // height: 20,
    // width: 20,
    padding: 6,
    resizeMode: "center",
    marginRight: 10,
  },
  img2: {
    height: 25,
    width: 30,
    resizeMode: "center",
    borderRadius: 10,
    marginRight: 10,
    overflow: "hidden",
  },
  profileImage: {
    borderRadius: hp(10),
    top: hp(-4),
    overflow: "hidden",
    borderWidth: hp(0.4),
    borderColor: colors.yellow,
  },
  img3: { height: 15, width: 20, margin: 6, marginLeft: 20 },
});
