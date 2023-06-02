import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container";
import { globalPath } from "../../constants/globalPath";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import { _toast } from "../../constants/Index";

import ResponsiveText from "../../components/RnText";
import FastImage from "react-native-fast-image";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { useDispatch, useSelector } from "react-redux";
import { getCartList } from "../../redux/actions/user.actions";

const ProductDetail = ({ navigation, route }) => {
  const item = route.params;
  console.log('first', item)
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.userReducers.cartList.data);

  const [count, setCount] = useState(1);
  const addToCart = async () => {
    var obj={
      "orderId": cartList.id?cartList.id:0,
      "objOrderDetail": [
        {
          "orderId": cartList.id?cartList.id:0,
          "itemId": item.id,
          "quantity": count,
          "price": item.price
        }
      ]
    }
    console.log('obj', obj)
    try {
      const res = await Api.post(urls.ADD_TO_CART,obj);
      console.log("add to cart", res);
      if (res&&res.success==true) {
        _toast(res.message)
        dispatch(getCartList());
    
      } else {
        _toast(res.message)
      }
    } catch (error) {}
  };
  return (
    <Container navigation={navigation}>
      <FastImage
        resizeMode="contain"
        style={{
          height: hp(35),
          width: wp(85),
          alignSelf: "center",
          marginVertical: hp(5),
        }}
        source={
          item.fullPath
            ? {
                priority: FastImage.priority.high,
                uri: item.fullPath,
              }
            : globalPath.product
        }
      />

      <View style={styles.container1}>
        <View
          style={{
            flexDirection: "row",
            marginVertical: wp(3),
            justifyContent: "space-between",
          }}
        >
          <View>
            <ResponsiveText size={4}>{item.name}</ResponsiveText>
            <ResponsiveText size={3.3} color={colors.red} margin={[5, 0, 0, 0]}>
              Weight: {item.weight} {item.unit}
            </ResponsiveText>
          </View>
          <View style={styles.addMinusContainer}>
            <TouchableOpacity
              style={styles.addMinusIcon}
              onPress={() => setCount(count > 1 ? count - 1 : 1)}
            >
              <ResponsiveText size={5} weight={"bold"}>
                -
              </ResponsiveText>
            </TouchableOpacity>
            <ResponsiveText color={colors.white}>{count}</ResponsiveText>
            <TouchableOpacity
              style={styles.addMinusIcon}
              onPress={() => setCount(count + 1)}
            >
              <ResponsiveText size={5} weight={"bold"}>
                +
              </ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>
        <ResponsiveText size={3}>{item.description}</ResponsiveText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: hp(1.5),
          alignItems: "center",
        }}
      >
        <ResponsiveText size={5} weight="bold">
          Rs:{item.price * count}
        </ResponsiveText>
        <TouchableOpacity style={styles.cartBtn} onPress={addToCart}>
          <ResponsiveText size={4} color={colors.secondary}>
            ADD TO CART
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: wp(3),
  },
  cartBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    height: hp(5),
    width: wp(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    // alignSelf: "flex-end",
  },
  addMinusIcon: {
    backgroundColor: colors.secondary,
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    justifyContent: "center",
    alignItems: "center",
  },
  addMinusContainer: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    width: wp(30),
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
