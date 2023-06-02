import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import ResponsiveText from "../../../components/RnText";
import Input from "../../../components/Input";
import RnButton from "../../../components/RnButton";
import { routeName } from "../../../constants/routeName";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import urls from "../../../redux/lib/urls";
import Api from "../../../redux/lib/api";
import Loader from "../../../components/Loader";
const Verification = ({ navigation, route }) => {
  const id = route.params
  console.log('first', id)
  const CELL_COUNT = 6;
  const [value, setValue] = React.useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [errorString, setErrorString] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [loading, setLoading] = useState(false);
  const Submit = async () => {
    setErrorString("");

    if (value == "") {
      setErrorString("Please enter your number");
      return false;
    }
    try {
      setLoading(true);
      const res = await Api.get(urls.VERIFICATION_CODE + id + '/' + value);
      console.log("res", res);
      if (res && res.success == true) {
        setErrorString(res.message);
        setLoading(false);
        navigation.navigate(routeName.FORGET_PASSWORD,id);
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
        Verification
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
        <ResponsiveText
          margin={[20]}
          textAlign="center"
          size={4}
          color={colors.primary}
        >
          A text message with six digit code send to your number: 000-000
        </ResponsiveText>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <RnButton
          margin={[50, 0, 0, 0]}
          title={"CONTINUE"}
          onPress={Submit}

        //   onPress={() => navigation.navigate(routeName.HOME_STACK)}
        />
      </View>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};
export default Verification;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  codeFiledRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 26,
    // borderWidth: 2,
    // borderColor: '#00000030',
    textAlign: "center",
    justifyContent: "center",
    color: colors.black,
    backgroundColor: colors.lightGrey,
    elevation: 9,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    padding: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  focusCell: {
    // borderColor: colors.grey1,
    color: colors.black,
    textAlign: "center",
    justifyContent: "center",
  },
});
