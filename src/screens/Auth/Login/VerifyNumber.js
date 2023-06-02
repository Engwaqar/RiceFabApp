import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import ResponsiveText from "../../../components/RnText";
import Input from "../../../components/Input";
import RnButton from "../../../components/RnButton";
import { routeName } from "../../../constants/routeName";
import { SafeAreaView } from "react-native-safe-area-context";
import urls from "../../../redux/lib/urls";
import Api from "../../../redux/lib/api";
import Loader from "../../../components/Loader";
const VerifyNumber = ({ navigation }) => {
  const [errorString, setErrorString] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [loading, setLoading] = useState(false);
  const Submit = async () => {
    setErrorString("");

    if (userName == "") {
      setErrorString("Please enter your number");
      
      return false;
    }
    try {
      setLoading(true);
      const res = await Api.get(urls.FORGOT_PASSWORD_BY_NUMBER + userName);
      console.log("res", res);
      if (res && res.success == true) {
        setErrorString(res.message);
        setLoading(false);
        navigation.navigate(routeName.VERIFICATION,res.data);
      } else {
        setErrorString(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorString(error);

    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ResponsiveText
        margin={[20, 0, 0, 20]}
        weight={"bold"}
        size={5}
        color={colors.white}
      >
        Verify your Number
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
        <ResponsiveText margin={[20]} textAlign='center' size={4} color={colors.primary}>
          Please enter your valid mobile number for verification
        </ResponsiveText>
        <Input
          placeholder={"Enter Phone Number"}
          onChnageText={(text) => setUserName(text)}
          keyboardType='numeric'
        />
        <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>
          {errorString}
        </ResponsiveText>
        <RnButton
          margin={[50, 0, 0, 0]}
          title={'Countinue'}
          onPress={Submit}
        // onPress={() => navigation.navigate(routeName.VERIFICATION)}
        />
      </View>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};
export default VerifyNumber;
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
