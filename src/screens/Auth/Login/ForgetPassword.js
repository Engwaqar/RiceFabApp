import React, { useEffect,useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity  } from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import { loginUser } from "../../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveText from "../../../components/RnText";
import Input from "../../../components/Input";
import { globalPath } from "../../../constants/globalPath";
import RnButton from "../../../components/RnButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../../../components/Loader";
import { ScrollView} from "react-native-gesture-handler";
import { routeName } from "../../../constants/routeName";
import urls from "../../../redux/lib/urls";
import Api from "../../../redux/lib/api";
import { _toast } from "../../../constants/Index";

const ForgetPassword = ({ navigation ,route}) => {
  const id = route.params
  console.log('forgetPassword', id)
  const [errorString, setErrorString] = React.useState("");
  const [NewPassword, setNewPassword] = React.useState("");
  const [ConfirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = useState(false);

  const Submit = async () => {
    setErrorString("");
    
     if (NewPassword == "") {
      setErrorString("Please enter New Password");
      return false
    }
    else if(ConfirmPassword == ""){
      setErrorString("Please enter Confirm Password");
      return false
    }
    else if (ConfirmPassword!=NewPassword) {
      setErrorString('Password and confirm password must be same')
      return false
  }
    try {
      setLoading(true);
      const res = await Api.put(urls.FORGET_PASSWORD+id+'/'+ConfirmPassword);
      console.log("res", res);
      if (res && res.success == true) {
        setErrorString(res.message);
        setLoading(false);
        navigation.navigate(routeName.LOGIN);
        _toast(res.message);
      } else {
        setErrorString(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorString(error);

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
        <ScrollView>
          <Image style={styles.logo} source={globalPath.logo} />
          <ResponsiveText
            margin={[20, 0, 0, 0]}
            weight={"bold"}
            textAlign='center'
            size={8}
            color={colors.primary}
          >
            Welcome
          </ResponsiveText>
          <ResponsiveText
            margin={[5, 0, hp(4), 0]}
            size={3.5}
            color={colors.black}
            textAlign='center'

          >
            Forget Password
          </ResponsiveText>
          <Input
            placeholder={"New Password"}
            onChnageText={(text) => setNewPassword(text)}
            // leftIcon={globalPath.mobile}
            value={removeEmojis(NewPassword)}
            secureTextEntry
            leftIcon={globalPath.LockIcon}

          />
          <Input
            placeholder={"Confirm Password"}
            onChnageText={(text) => setConfirmPassword(text)}
            // leftIcon={globalPath.mobile}
            value={removeEmojis(ConfirmPassword)}
            secureTextEntry
            leftIcon={globalPath.LockIcon}

          />
          <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>
            {errorString}
          </ResponsiveText>
          <RnButton
            margin={[50, 0, 0, 0]}
            title={"Countinue"}
            // onPress={() => navigation.navigate(routeName.BOTTOM_TABS)}
            onPress={Submit}
          />
        </ScrollView>
      </View>
      {loading ? <Loader /> : undefined}

    </SafeAreaView >
  );
};
export default ForgetPassword;
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

