import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import ResponsiveText from "./RnText";
import { wp, hp } from "../helpers/Responsiveness";

export default function RadioButton({ isActive, title, price, onPress }) {
  return (
    <TouchableOpacity style={styles.listView} onPress={onPress}>
        <View
          style={{
            backgroundColor: isActive ? colors.white : undefined,
            borderRadius: 50,
            borderColor: isActive ? colors.primary : colors.grey1,
            borderWidth: 2,
            height: 25,
            width: 25,
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
          }}
        >
          {isActive ? (
            <View style={{width:10,height:10,borderRadius:5,backgroundColor:colors.primary}} />
          ) : (
            <View />
          )}
        </View>
        <ResponsiveText margin={[0, 0, 0, 20]}>{title}</ResponsiveText>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  listView: {
    flexDirection: "row",
    backgroundColor: colors.white,
    width: wp(30),
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
