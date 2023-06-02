import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import ResponsiveText from "../../../components/RnText";
import Input from "../../../components/Input";
import { globalPath } from "../../../constants/globalPath";
import { _toast } from "../../../constants/Index";

import RnButton from "../../../components/RnButton";
import { routeName } from "../../../constants/routeName";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Api from "../../../redux/lib/api";
import urls from "../../../redux/lib/urls";
const Register = ({ navigation }) => {

  const [errorString, setErrorString] = React.useState("");
  const [fullName, setfullName] = React.useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setconfirmPassword] = React.useState("");

  const userRegister = async () => {
    var obj={
      "fullName":fullName,
      "contactNumber": mobile,
      "email": email,
      // "address": "",
      "password": password,
      "userTypeId": 3
    }
    console.log('obj', obj)
    // return false
    try {
      const res = await Api.post(urls.REGISTER,obj);
      console.log("res", res);
      if (res&&res.success==true) {
        _toast(res.message)
        navigation.goBack()
      } else {
        _toast(res.message)
      }
    } catch (error) {}
  };

  const Validation = (item) => {
    setErrorString("");
    if (fullName === "" && email === "" && mobile === "" && password === "" && confirmPassword === "") {
      setErrorString("All fields are required");
    } else if (fullName === "") {
      setErrorString("Full name is required");
    } else if (mobile === "") {
      setErrorString("Phone number is required");
    } 
    // else if (email === "") {
    //   setErrorString("Email is required");
    // } 
    else if (password === "") {
      setErrorString("Password is required");
    } else if (confirmPassword === "") {
      setErrorString("Confirm Password is required");
    } else if (confirmPassword !== password) {
      setErrorString("Password and confirm password must be same!");
    }  else {
      userRegister();
      setErrorString("");
    }
  };
  function removeEmojis(string) {
    var regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, "");
  }
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View
        style={{
          flex: 1,
          marginTop: hp(3),
          padding: wp(5),
          backgroundColor: colors.white,
          borderTopLeftRadius: wp(8),
          borderTopRightRadius: wp(8),
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image style={styles.logo} source={globalPath.logo} />
          <ResponsiveText
            margin={[20, 0, 0, 0]}
            weight={"bold"}
            textAlign="center"
            size={8}
            color={colors.primary}
          >
            Create Account
          </ResponsiveText>
          <ResponsiveText
            margin={[5, 0, hp(4), 0]}
            size={3.5}
            color={colors.black}
            textAlign="center"
          >
            Create a new account
          </ResponsiveText>
          <Input
            placeholder={"Full Name"}
            onChnageText={(text) => setfullName(text)}
            leftIcon={globalPath.profile}
            value={fullName}
          />
          <Input
            placeholder={"Phone"}
            onChnageText={(text) => setMobile(text)}
            leftIcon={globalPath.mobile}
            value={mobile}
            keyboardType='numeric'
          />
          <Input
            placeholder={"Email"}
            onChnageText={(text) => setEmail(text)}
            leftIcon={globalPath.EmailIcon}
            value={email}
          />
          <Input
            placeholder={"Password"}
            value={removeEmojis(password)}
            secureTextEntry
            onChnageText={(text) => setPassword(text)}
            leftIcon={globalPath.LockIcon}
          />

          <Input
            placeholder={"Confirm Password"}
            value={removeEmojis(confirmPassword)}
            secureTextEntry
            onChnageText={(text) => setconfirmPassword(text)}
            leftIcon={globalPath.LockIcon}
          />

          <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>
            {errorString}
          </ResponsiveText>
          <RnButton
            margin={[50, 0, 0, 0]}
            title={"SIGN UP"}
            onPress={Validation}
            // onPress={() => navigation.navigate(routeName.PERSONAL_INFO)}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default Register;
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
