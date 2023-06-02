import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { wp } from "../../helpers/Responsiveness";

const ProfileView = ({title,value,icon}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.4,
        borderColor: colors.grey1,
        padding:wp(4)
      }}
    >
      <Icon size={wp(6)} source={icon} tintColor={colors.black} />
      <View style={{ marginLeft: wp(4) }}>
        <ResponsiveText>{title}</ResponsiveText>
        <ResponsiveText color={colors.grey1}>{value}</ResponsiveText>
      </View>
    </View>
  );
};

export default ProfileView;

const styles = StyleSheet.create({});
