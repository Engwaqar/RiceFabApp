import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  Text,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
import { colors } from "../../../constants/colorsPallet";
import { routeName } from "../../../constants/routeName";
import { globalPath } from "../../../constants/globalPath";
import { hp, wp } from "../../../helpers/Responsiveness";
import Fonts from "../../../helpers/Fonts";
import RnText from "../../../components/RnText";

import { useDispatch } from "react-redux";
import ResponsiveText from "../../../components/RnText";
import RnButton from "../../../components/RnButton";

const Splash = ({ navigation }) => {
  //Validation Login
  const [Token, setToken] = React.useState(null);
  const [logo, setLogo] = React.useState(false);
  const [text, setText] = React.useState(false);

  const fetchAndSetUser = async () => {
    // await AsyncStorage.clear();

    const token = await AsyncStorage.getItem("@token");
    const id = await AsyncStorage.getItem("@userId");
    setToken(token);
    if (token === null) {
      setTimeout(() => {
        setLogo(true);
        // setTimeout(() => {
        //   setLogo(false);
        //   setText(true);
        //   // setTimeout(() => {
        //   //   navigation.dispatch(
        //   //     CommonActions.reset({
        //   //       index: 0,
        //   //       routes: [{ name: routeName.LOGIN }],
        //   //     })
        //   //   );
        //   // }, 2000);
        // }, 2000);
      }, 2000);
    } else {
      // navigation.dispatch(StackActions.replace(routeName.LANDING_SCREEN));
      navigation.replace(routeName.BOTTOM_TABS);
    }
  };

  React.useEffect(() => {
    fetchAndSetUser();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={globalPath.splashimg} />
        <ResponsiveText margin={[hp(2), 0, 0, 0]} size={8} weight="bold" color={colors.secondary}>
          The experience of buying rice quickly
        </ResponsiveText>
        <ResponsiveText margin={[hp(3), 0, 0, 0]} size={4} color={colors.white}>
          The 100% finest Basmati Rice for cuisine
        </ResponsiveText>
        {logo==true?
        <>
        <RnButton
          margin={[hp(5), 0, 0, 0]}
          title={"SIGN UP"}
          textColor={colors.black}
          backgroundColor={colors.secondary}
          onPress={() => navigation.navigate(routeName.REGISTER)}
        />
        <RnButton
          margin={[10, 0, 0, 0]}
          backgroundColor={colors.white}
          textColor={colors.black}
          title={"SIGN IN"}
          onPress={() => navigation.navigate(routeName.LOGIN)}
        />
        </>:null
      }
      </View>
      <View style={styles.footerContainer}>
        <RnText color={colors.white} fontFamily={Fonts.LightItalic}>
          Powered by{" "}
        </RnText>
        <Image style={styles.poweredLogo} source={globalPath.CompanyLogo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: hp(40),
    width: wp(80),
    resizeMode: "contain",
    marginTop:hp(10),
    alignSelf:'center'
  },
  poweredLogo: {
    height: hp(15),
    width: wp(15),
    resizeMode: "contain",
    tintColor: colors.white,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
export default Splash;
