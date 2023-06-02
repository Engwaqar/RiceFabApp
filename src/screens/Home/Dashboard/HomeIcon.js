import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../constants/colorsPallet";
import { wp } from "../../../helpers/Responsiveness";
import Icon from "../../../components/Icon";
import ResponsiveText from "../../../components/RnText";
import { globalPath } from "../../../constants/globalPath";

const HomeIcon = ({ title, onPress, backgroundColor, titleColor }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.featureIcon,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.background,
          },
        ]}
        onPress={onPress}
      >
        <Icon
          size={25}
          tintColor={colors.primary}
          source={globalPath.dashboard}
        />
      </TouchableOpacity>
      <ResponsiveText
        textAlign={"center"}
        margin={[10, 0, 0, 0]}
        color={titleColor ? titleColor : colors.black}
      >
        {title}
      </ResponsiveText>
    </View>
  );
};

export default HomeIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(25),
  },

  featureIcon: {
    backgroundColor: colors.white,
    width: wp(15),
    height: wp(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(7.5),
  },
});
