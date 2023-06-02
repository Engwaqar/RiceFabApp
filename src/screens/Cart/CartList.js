import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect,useState } from "react";
import Container from "../../components/Container";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { colors } from "../../constants/colorsPallet";
import { _toast } from "../../constants/Index";

import Steps from "./Steps";
import { routeName } from "../../constants/routeName";
import { useDispatch, useSelector } from "react-redux";
import { getCartList } from "../../redux/actions/user.actions";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import RecordNotFound from "../../components/RecordnotFound";
import Loader from "../../components/Loader";

const CartList = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.userReducers.cartList.data);
  const Loading = useSelector((state) => state.userReducers.cartList.refreshing);
  console.log("cartList", cartList);
  useEffect(() => {
    dispatch(getCartList());
  }, []);
  const updateItem = async (id, quantity, type) => {
    if (quantity == 1 && type == "Dec") {
      return false;
    }
    var obj = {
      quantity: type == "Inc" ? quantity + 1 : quantity > 1 ? quantity - 1 : 1,
    };
    console.log("obj", obj);
    try {
      const res = await Api.put(urls.EDIT_CART_ITEM + id, obj);
      console.log("add to cart", res);
      if (res && res.success == true) {
        // _toast(res.message); 
        dispatch(getCartList());
      } else {
        _toast(res.message);
      }
    } catch (error) { }
  };
  const DELETEItem = async (id) => {
    try {
      const res = await Api.delete(urls.DELETE_CART_ITEM + id);
      console.log("add to cart", res);
      if (res && res.success == true) {
        _toast(res.message);
        dispatch(getCartList());
      } else {
        _toast(res.message);
      }
    } catch (error) { }
  };
  return (
    <Container
      navigation={navigation}
      padding={wp(5)} title={"My Cart"}>
      {Object.keys(cartList).length > 0 ?
        <>

          <Steps first />
          {cartList?.objGetAllOrderDetail?.map((item) => (
            <TouchableOpacity
              style={styles.iconStyle}
            // onPress={() => navigation.navigate(routeName.PRODUCT_DETAIL,{item:item})}
            >
              <Icon
                size={wp(20)}
                source={item.fullPath ? { uri: item.fullPath } : globalPath.product}
              />
              <View style={{ flex: 0.9 }}>
                <View style={{flexDirection:'row',justifyContent:"space-between",width:wp(50)}} >

                <ResponsiveText size={3.3}>{item.itemName}</ResponsiveText>
                <ResponsiveText size={3} color={colors.green}>
                Total  Rs:{item.price*item.quantity}
                </ResponsiveText>
                </View>
                <ResponsiveText
                  size={3.3}
                  color={colors.grey1}
                  margin={[10, 0, 5, 0]}
                >
                  Wieght: {item.weight} {item.unit}
                </ResponsiveText>
                <ResponsiveText size={3.3}>Rs: {item.price}</ResponsiveText>
              </View>
              <View
                style={{ justifyContent: "space-between", alignItems: "flex-end" }}
              >
                
                <TouchableOpacity onPress={() => DELETEItem(item.id)}>
                  <Icon size={wp(5)} source={globalPath.deleteIcon} />
                </TouchableOpacity>
               
                <View style={styles.addMinusContainer}>
                  <TouchableOpacity
                    style={styles.addMinusIcon}
                    onPress={() => updateItem(item.id, item.quantity, "Dec")}
                  >
                    <ResponsiveText size={5} weight={"bold"}>
                      -
                    </ResponsiveText>
                  </TouchableOpacity>
                  <ResponsiveText color={colors.white}>
                    {item.quantity}
                  </ResponsiveText>
                  <TouchableOpacity
                    style={styles.addMinusIcon}
                    onPress={() => updateItem(item.id, item.quantity, "Inc")}
                  >
                    <ResponsiveText size={5} weight={"bold"}>
                      +
                    </ResponsiveText>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.footr}>
            <ResponsiveText size={5} weight="bold">
              Rs:{cartList.totalAmount}
            </ResponsiveText>
            <TouchableOpacity
              style={styles.cartBtn}
              onPress={() => navigation.navigate(routeName.CHECKOUT, cartList)}
            >
              <ResponsiveText weight={"bold"} size={4} color={colors.secondary}>
                CHECKOUT
              </ResponsiveText>
            </TouchableOpacity>
          </View>
        </> :
        <RecordNotFound text={'Your cart is Empty!'} />
      }
      {Loading ? <Loader /> : undefined}
    </Container>
  );
};

export default CartList;

const styles = StyleSheet.create({
  iconStyle: {
    flexDirection: "row",
    // alignItems: "flex-end",
    paddingVertical: hp(2),
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 9,
    shadowColor: colors.grey1,
    shadowOpacity: 0.3,
    // padding: 25,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginBottom: hp(2),
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
    height: hp(5),
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 10,
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
  footr: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    padding: wp(3),
    position: "absolute",
    bottom: 0,
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
});
