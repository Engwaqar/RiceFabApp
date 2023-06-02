import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../components/Container";
import { globalPath } from "../../constants/globalPath";
import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import Steps from "./Steps";
import moment from "moment";

const PaymentSuccess = ({navigation,route}) => {
  const data = route.params;

    const fontSize=3
  return (
    <Container navigation={navigation} title={"Payment Success"} padding={wp(5)}>
        <Steps third />
      <ImageBackground
        style={{
          width: wp(85),
          flex: 1,
          alignSelf: "center",
          alignItems: "center",
          paddingVertical: hp(3),
        }}
        source={globalPath.paymentsuccessBg}
      >
        <Icon size={wp(25)} source={globalPath.tick} />
        <ResponsiveText
          size={3.3}
          margin={[hp(2), 0, 0, 0]}
          color={colors.red5}
        >
          Great
        </ResponsiveText>
        <ResponsiveText size={4.5} margin={[5, 0, hp(2), 0]}>
          Payment Success
        </ResponsiveText>

        <View style={styles.row}>
          <ResponsiveText size={fontSize} flex={1}>From Bank</ResponsiveText>
          <ResponsiveText size={fontSize} flex={1}>VISA</ResponsiveText>
        </View>
        <View style={styles.row}>
          <ResponsiveText size={fontSize} flex={1}>Pay</ResponsiveText>
          <ResponsiveText size={fontSize} flex={1}>Rs: {data.totalAmount}</ResponsiveText>
        </View>
        {/* <View style={styles.row}>
          <ResponsiveText size={fontSize} flex={1}>Administration</ResponsiveText>
          <ResponsiveText size={fontSize} flex={1}>Rs: 150:00</ResponsiveText>
        </View> */}
        <View style={styles.row}>
          <ResponsiveText size={fontSize} flex={1}>Pay Date</ResponsiveText>
          <ResponsiveText size={fontSize} flex={1}>{moment(new Date()).format('MMM DD, YYYY')}</ResponsiveText>
        </View>
        <View style={{flex:1}} />
        <ResponsiveText
          size={3}
          margin={[hp(2), 0, 0, 0]}
          color={colors.red5}
        >
          Total Pay
        </ResponsiveText>
        <ResponsiveText size={4.5} margin={[5, 0, hp(1), 0]}>
          Rs: {data.totalAmount}
        </ResponsiveText>
      </ImageBackground>
    </Container>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: wp(65),
    paddingVertical: 13,
    borderBottomWidth: 0.3,
  },
});
