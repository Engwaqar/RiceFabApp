import React, { useEffect } from "react";
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
const Login = ({ navigation }) => {
  const loading = useSelector(
    (state) => state.userReducers.loginScreen.refreshing
  );
  const loginResponse = useSelector(
    (state) => state.userReducers.loginScreen.data
  );
  const loginNetworkErr = useSelector(
    (state) => state.userReducers.loginScreen.errorMsg
  );
  const [errorString, setErrorString] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  //Redux Action Called
  const dispatch = useDispatch();
  const userLogin = () => {
    dispatch(
      loginUser({
        params: {
          contactNumber: userName,
          password: password,
          userTypeId: 3,
        },
        navigation: navigation,
      })
    );
  };

  useEffect(() => {
    // getCompanies();
  }, []);
  useEffect(() => {
    loginResponse ? setErrorString(loginResponse.message) : null;
    loginNetworkErr ? setErrorString(loginNetworkErr.message) : null;
  }, [loginResponse, loginNetworkErr]);

  const Validation = () => {
    setErrorString("");
    if (userName === "" && password === "") {
      setErrorString("All fields are required");
    } else if (userName === "" || userName === null) {
      setErrorString("Username is required");
    } else if (password === "") {
      setErrorString("Password is required");
    } else {
      userLogin();
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
            Sign in to continue
          </ResponsiveText>
          <Input
            placeholder={"Phone"}
            onChnageText={(text) => setUserName(text)}
            leftIcon={globalPath.mobile}
            keyboardType='numeric'

          />

          <Input
            placeholder={"Password"}
            value={removeEmojis(password)}
            secureTextEntry
            onChnageText={(text) => setPassword(text)}
            leftIcon={globalPath.LockIcon}
          />
          <TouchableOpacity onPress={() => navigation.navigate(routeName.VERIFY_NUMBER)}>
            <ResponsiveText margin={[hp(3), 0, 0, 0]} > ───────  Forgot Password?  ───────</ResponsiveText>
          </TouchableOpacity>
          <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>
            {errorString}
          </ResponsiveText>
          <RnButton
            margin={[50, 0, 0, 0]}
            title={"SIGN IN"}
            // onPress={() => navigation.navigate(routeName.BOTTOM_TABS)}
            onPress={Validation}
          />
        </ScrollView>
      </View>
      {loading ? <Loader /> : undefined}

    </SafeAreaView >
  );
};
export default Login;
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
