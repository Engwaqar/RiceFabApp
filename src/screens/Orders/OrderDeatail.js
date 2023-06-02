import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Container from "../../components/Container";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import moment from "moment";
import { globalPath } from "../../constants/globalPath";
import Icon from "../../components/Icon";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import { getCartList } from "../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";

const OrderDeatail = ({ navigation, route }) => {
  const cartList = useSelector((state) => state.userReducers.cartList.data);
  const dispatch = useDispatch();

  const data = route.params;
  const [Loading, setLoading] = useState(false);
  console.log('firstdata', data)
  const margin = [10, 0, 0, 0];
  const RapeatOrder = async () => {
    if (Object.keys(cartList).length > 0) {
      _toast('Please baaz ajyen!');
      return false
    }
    try {
      setLoading(true)
      const res = await Api.post(urls.RAPEAT_ORDERS + data.id);
      console.log("res", res);
      if (res && res.success == true) {
        dispatch(getCartList());
        _toast(res.message);
        setLoading(false);
        navigation.navigate(routeName.CART_LIST);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Container title={"Order Detail"} navigation={navigation} >
      <View style={{ flexDirection: "row", margin: wp(8) }}>
        <View style={{ flex: 0.3 }}>
          <ResponsiveText weight={"bold"}>Name:</ResponsiveText>
          <ResponsiveText weight={"bold"} margin={margin}>
            Order#:
          </ResponsiveText>
          <ResponsiveText weight={"bold"} margin={margin}>
            Time:
          </ResponsiveText>
          <ResponsiveText weight={"bold"} margin={margin}>
            Address:
          </ResponsiveText>
        </View>
        <View style={{ flex: 0.7 }}>
          <ResponsiveText size={3.3} color={colors.grey1}>
            {data.userName}
          </ResponsiveText>

          <ResponsiveText size={3.3} color={colors.grey1} margin={margin}>
            {data.orderNumber}
          </ResponsiveText>
          <ResponsiveText size={3.3} color={colors.grey1} margin={margin}>
            {moment(data.dateCreated).format('DD MMM YYYY')}
          </ResponsiveText>
          <ResponsiveText size={3.3} color={colors.grey1} margin={margin}>
            {data.deliveryAddress}
          </ResponsiveText>
        </View>
        {/* <TouchableOpacity style={{ alignItems: 'flex-end' }}
         onPress={() => RapeatOrder()}
        >
          <Icon
            tintColor={colors.grey1}
            margin={[0, 0, 0, 0]}
            size={35} source={globalPath.RepeatOrderIcon} />
        </TouchableOpacity> */}
        <View>
          <TouchableOpacity style={styles.cartBtn} onPress={() => RapeatOrder()}>
            <ResponsiveText size={2.8} color={colors.secondary}>
              Repeat Order
            </ResponsiveText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container1}>
        <View
          style={[
            styles.container1,
            {
              backgroundColor: colors.lightGrey,
              padding: 0,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              flex: 0,
            },
          ]}
        >
          <View
            style={{
              backgroundColor: colors.primary,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              paddingHorizontal: 15,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <ResponsiveText color={colors.secondary}>
              Ordered Items
            </ResponsiveText>
            <ResponsiveText color={colors.secondary}>Qty</ResponsiveText>
            <ResponsiveText color={colors.secondary}>Weight</ResponsiveText>

            <ResponsiveText color={colors.secondary}>Amount</ResponsiveText>
          </View>
          {data.objGetAllOrderDetail.map((item) => (
            <View
              style={{
                flexDirection: "row",
                padding: 13,
                borderTopWidth: 0.23,
                borderColor: colors.grey1,
              }}
            >
              <View style={{ flex: 0.4 }}>
                <ResponsiveText size={3.3} >{item.itemName}</ResponsiveText>
              </View>
              <View style={{ flex: 0.2 }}>
                <ResponsiveText size={3.3} >{item.quantity}{item.unit}</ResponsiveText>
              </View>
              <View style={{ flex: 0.25 }}>
                <ResponsiveText size={3.3} >{item.weight}{item.unit}</ResponsiveText>
              </View>
              <View style={{ flex: 0.2 }}>
                <ResponsiveText size={3.3} >Rs: {item.subTotal}</ResponsiveText>
              </View>
            </View>
          ))}
        </View>
        <View style={{ position: 'absolute', bottom: 0, width: wp(100), padding: wp(5) }} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }} >
            <ResponsiveText>Sub Total</ResponsiveText>
            <ResponsiveText>RS: {data.totalAmount}</ResponsiveText>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 0.23 }} >
            <ResponsiveText>Delivery Charges</ResponsiveText>
            <ResponsiveText>RS: {data.deliveryCharges ? data.deliveryCharges : '0.00'}</ResponsiveText>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }} >
            <ResponsiveText>Final Total</ResponsiveText>
            <ResponsiveText size={4.5} >RS: {data.totalAmount + data.deliveryCharges}</ResponsiveText>

          </View>
        </View>
      </View>
      {Loading ? <Loader /> : null}
    </Container>
  );
};

export default OrderDeatail;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: wp(5),
  },
  cartBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    height: hp(3),
    justifyContent: "center",
    borderRadius: 8,
    alignSelf: "flex-end",
  },
});
