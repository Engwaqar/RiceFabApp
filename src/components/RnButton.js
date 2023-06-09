import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { handleMargin, handlePadding } from "../constants/theme";
import { hp, wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import ResponsiveText from "./RnText";

const RnButton = ({
  backgroundColor,
  textColor,
  width,
  padding,
  margin,
  gradColor,
  height,
  borderRadius,
  title,
  fontFamily,
  onPress,
  position,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : null}
      style={[
        styles.Btn,
        props.btnStyle ? props.btnStyle : undefined,
        margin ? handleMargin(margin) : undefined,
        padding ? handlePadding(padding) : undefined,
        position && { alignSelf: position },
        backgroundColor && { backgroundColor },
      ]}
      {...props}
    >
      {title && (
        <ResponsiveText
          size={3.7}
          padding={[0, 10]}
          fontFamily={fontFamily ? fontFamily : "Bold"}
          color={textColor ? textColor : colors.secondary}
        >
          {title}
        </ResponsiveText>
      )}
      {props.children}
    </TouchableOpacity>
  );
};

export default RnButton;

const styles = StyleSheet.create({
  Btn: {
    borderRadius:10,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf:'center',
    backgroundColor: colors.primary,
    height: hp(6),
    width:wp(85),
    flexDirection: "row",
  },
});
