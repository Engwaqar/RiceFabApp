import React, { useEffect, version } from "react";

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { hp, wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
export default function RecordNotFound({ text }) {
  return (
    <View style={{ flex: 1, width: wp(100), justifyContent: 'center', alignItems: "center", alignSelf: "center" }}>
      <Icon size={hp(35)} source={globalPath.RecordNotFound} />
      <ResponsiveText margin={[-30, 0, 0, 0]} textAlign={"center"}>
        {text ? text : "Record not found"}
      </ResponsiveText>
    </View>
  );
}
