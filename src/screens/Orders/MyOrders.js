import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Container from "../../components/Container";
import { globalPath } from "../../constants/globalPath";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import { routeName } from "../../constants/routeName";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/actions/user.actions";
import moment from "moment";
import Loader from "../../components/Loader";
import RecordNotFound from "../../components/RecordnotFound";
import { ScrollView } from "react-native-gesture-handler";

const MyOrders = ({ navigation }) => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.userReducers.allOrders.data);
  const Loading = useSelector((state) => state.userReducers.allOrders.refreshing);

  useEffect(() => {
    dispatch(getAllOrders());

  }, []);

  return (
    <Container title="My Orders" navigation={navigation}>
      <ScrollView>
        {allOrders.length > 0 ?
          allOrders.map((item) => (
            <TouchableOpacity style={styles.iconStyle}>
              <Icon size={wp(20)} source={globalPath.product} />
              <View style={{ flex: 0.94 }}>
                {/* <ResponsiveText size={3.3}>Basmati Rice 2kg</ResponsiveText> */}
                <ResponsiveText
                  size={3.3}
                  color={colors.grey1}
                  margin={[3, 0, 15, 0]}
                >
                  Order #: {item.orderNumber}
                </ResponsiveText>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <ResponsiveText size={3}>items:</ResponsiveText>
                    <ResponsiveText
                      size={2.5}
                      color={colors.grey1}
                      margin={[3, 0, 5, 0]}
                    >
                      {item.objGetAllOrderDetail?.length} items
                    </ResponsiveText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <ResponsiveText size={3}>Date:</ResponsiveText>
                    <ResponsiveText
                      size={2.5}
                      color={colors.grey1}
                      margin={[3, 0, 5, 0]}
                    >
                      {moment(item.dateCreated).format('MM/D/YYYY')}
                    </ResponsiveText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <ResponsiveText size={3}>Status:</ResponsiveText>
                    <ResponsiveText
                      size={2.5}
                      color={colors.red}
                      margin={[3, 0, 5, 0]}
                    >
                      {item.orderStatus}
                    </ResponsiveText>
                  </View>
                </View>
              </View>
              <View style={{ justifyContent: "space-between" }}>
                <ResponsiveText size={4} weight={"bold"}>
                  Rs: {item.totalAmount}
                </ResponsiveText>
                <TouchableOpacity
                  style={styles.cartBtn}
                  onPress={() => navigation.navigate(routeName.ORDER_DETAIL, item)}
                >
                  <ResponsiveText size={2.8} color={colors.secondary}>
                    DETAILS
                  </ResponsiveText>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )) : (Loading == false ?
            <RecordNotFound />
            : null
          )}
      </ScrollView>
      
      {Loading ? <Loader /> : null}
    </Container>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  iconStyle: {
    flexDirection: "row",
    paddingVertical: hp(2),
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 9,
    shadowColor: colors.grey1,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginTop: hp(1.5),
    marginHorizontal: wp(4),
  },

  cartBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 17,
    height: hp(3),
    justifyContent: "center",
    borderRadius: 8,
  },
});
