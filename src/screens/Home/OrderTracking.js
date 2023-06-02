import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../components/Container";
import { globalPath } from "../../constants/globalPath";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import Icon from "../../components/Icon";
import ResponsiveText from "../../components/RnText";
import RnButton from "../../components/RnButton";

const OrderTracking = () => {
  return (
    <Container title={"Order Tracking"}>
      <Image
        style={{
          width: wp(100),
          flex: 1,
          borderTopLeftRadius: wp(5),
          borderTopRightRadius: wp(5),
        }}
        source={globalPath.map}
      />
      <View style={styles.container1}>
        <View
          style={[
            styles.row,
            { borderBottomWidth: 0.4, borderColor: colors.grey1 },
          ]}
        >
          <View style={styles.row}>
            <Icon
              size={wp(10)}
              source={globalPath.profile}
              tintColor={colors.black}
              backgroundColor={colors.lightGrey}
              borderRadius={wp(5)}
              margin={[0, 10, 0, 0]}
            />
            <View>
              <ResponsiveText>Altaf Hussain</ResponsiveText>
              <ResponsiveText size={3} color={colors.grey1}>
                DK 5601ac
              </ResponsiveText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.chatcallIcon,{marginRight:10}]}>
              <Icon source={globalPath.chat} size={wp(5)} />
            </View>
            <View style={styles.chatcallIcon}>
              <Icon source={globalPath.call} size={wp(5)} />
            </View>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "flex-start" }]}>
          <Icon source={globalPath.bullet} size={wp(7)} />
          <View style={{ width: wp(65), marginLeft: wp(4) }}>
            <View style={[styles.row, { width: wp(50) }]}>
              <ResponsiveText>On the Way</ResponsiveText>
              <View
                style={{
                  width: 0.4,
                  height: 25,
                  backgroundColor: colors.grey1,
                }}
              />

              <ResponsiveText color={colors.red}>25 Mins</ResponsiveText>
            </View>
            <ResponsiveText size={3} color={colors.grey1}>
              Route 66 - Al Ain - Dubai Rd - Madinat hind 1 - Du ai - United
              Arab Emirates
            </ResponsiveText>
          </View>
        </View>
        <RnButton margin={[hp(2), 0, hp(2), 0]} title={"ORDER RECEIVED"} />
      </View>
    </Container>
  );
};

export default OrderTracking;

const styles = StyleSheet.create({
  container1: {
    // flex: 1,
    backgroundColor: colors.white,
    borderRadius: wp(6),
    padding: wp(3),
    width: wp(100),
    elevation: 9,
    shadowColor: colors.grey1,
    shadowOpacity: 0.3,
    // padding: 25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp(2),
  },
  chatcallIcon: {
    backgroundColor: colors.black,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center",
  },
});
