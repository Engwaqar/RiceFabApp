import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import { globalPath } from "../constants/globalPath";
import ResponsiveText from "./RnText";
import { useSelector } from "react-redux";
import { routeName } from "../constants/routeName";

const Container = ({ more, title, backgroundColor,padding, navigation, ...props }) => {
  const profileData = useSelector(
    (state) => state.userReducers.profileData.data
  );
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["left", "top", "right"]}
    >
      {more ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginVertical: hp(2),
            width: wp(80),
          }}
        >
          <Image
            source={globalPath.profile}
            style={{
              width: wp(18),
              height: wp(18),
              resizeMode: "contain",
              borderRadius: wp(9),
              borderWidth: 2,
              borderColor: colors.secondary,
            }}
          />
          <View>
            <ResponsiveText color={colors.white} margin={[0, 0, 0, 10]}>
              {profileData.fullName}
            </ResponsiveText>
            <ResponsiveText
              color={colors.grey1}
              size={2.6}
              margin={[0, 0, 0, 10]}
            >
              {profileData.email}
            </ResponsiveText>
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: wp(4),
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon source={globalPath.back1} />
          </TouchableOpacity>
          <ResponsiveText color={colors.white}>{title}</ResponsiveText>
          <TouchableOpacity onPress={() => navigation.navigate(routeName.CART_LIST)}>
          <Icon source={globalPath.cart} />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={[
          styles.container1,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.lightGrey,
              padding:padding?padding:undefined
          },
        ]}
      >
        {props.children}
      </View>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // paddingHorizontal: wp(4),
  },
});
