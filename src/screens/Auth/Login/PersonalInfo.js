import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import ResponsiveText from "../../../components/RnText";
import Input from "../../../components/Input";
import RnButton from "../../../components/RnButton";
import { routeName } from "../../../constants/routeName";
import { SafeAreaView } from "react-native-safe-area-context";
const PersonalInfo = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ResponsiveText
        margin={[20, 0, 0, 20]}
        weight={"bold"}
        size={5}
        color={colors.white}
      >
        Personal Information
      </ResponsiveText>
      <View
        style={{
          flex: 1,
          marginTop: hp(2),
          padding: wp(5),
          backgroundColor: colors.white,
          borderTopLeftRadius: wp(8),
          borderTopRightRadius: wp(8),
        }}
      >
        <Input
          placeholder={"Full Name"}
        //   onChnageText={(text) => setUserName(text)}
        />
        <ResponsiveText margin={[20, 0, 0, 0]} size={5} color={colors.primary}>
          Optional Information
        </ResponsiveText>
        <Input
          placeholder={"Add Email Address"}
        //   onChnageText={(text) => setUserName(text)}
        />
        <Input
          placeholder={"Referral Code"}
        //   onChnageText={(text) => setUserName(text)}
        />
        <ResponsiveText textDecorationLine='underline' color={colors.red5} margin={[20, 0, 0, 10]}>
          Terms & Conditions
        </ResponsiveText>
        <RnButton
          margin={[50, 0, 0, 0]}
          title={"NEXT"}
          onPress={() => navigation.navigate(routeName.VERIFY_NUMBER)}
        />
      </View>
    </SafeAreaView>
  );
};
export default PersonalInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: hp(15),
    width: wp(40),
    resizeMode: "contain",
    alignSelf: "center",
  },
});
