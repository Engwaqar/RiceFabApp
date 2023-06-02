import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Steps from "./Steps";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import { _toast } from "../../constants/Index";

import ResponsiveText from "../../components/RnText";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import RnButton from "../../components/RnButton";
import { routeName } from "../../constants/routeName";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import DropDown from "../../components/DropDown";
import { getAllOrders, getCartList } from "../../redux/actions/user.actions";
import { useDispatch } from "react-redux";

const Checkout = ({ navigation, route }) => {
  const data = route.params;
  const dispatch = useDispatch();

  const [Days, setDays] = useState([]);
  const [selectedDay, setselectedDay] = useState(null)
  const [TimeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)

  useEffect(() => {
    getDays();
    getTimeSlots();
  }, []);

  const getDays = async () => {
    try {
      const res = await Api.get(urls.DELIVERY_DAYS);
      console.log("days", res);
      if (res && res.success == true) {
        setDays(res.data);
        setselectedDay(res.data[0].value)
      } else {
      }
    } catch (error) {}
  };
  const getTimeSlots = async () => {
    try {
      const res = await Api.get(urls.DELIVERY_TIMES);
      console.log("times", res);
      if (res && res.success == true) {
        setTimeSlots(res.data);
        setSelectedTimeSlot(res.data[0].value)

      } else {
      }
    } catch (error) {}
  };

  const submit = async () => {
    var obj = {
      orderId: data.id,
      paymentMethodType: 1,
      deiveryDay: selectedDay,
      deiveryTime: selectedTimeSlot,
      lat: 0,
      long: 0,
    };
    console.log('obj', obj)
    try {
      const res = await Api.post(urls.PROCESS_ORDER, obj);
      console.log("process order", res);
      if (res && res.success == true) {
        _toast(res.message);
        dispatch(getCartList());
        dispatch(getAllOrders());

        navigation.replace(routeName.PAYMENT_SUCCESS,data);
      } else {
        _toast(res.message);
      }
    } catch (error) {}
  };

  return (
    <Container navigation={navigation} title={"Checkout"}>
      <ScrollView>
        <Steps second marginTop />
        <View style={styles.container1}>
          <ResponsiveText margin={[10]} size={4.5}>
            Delivery Option
          </ResponsiveText>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Icon margin={[0, 10, 0, 0]} source={globalPath.checkout_bullet} />
            <View>
              <ResponsiveText>Scheduled Delivery</ResponsiveText>
              <ResponsiveText
                color={colors.grey1}
                size={3}
                margin={[10, 0, 0, 0]}
              >
                Earliest Slot 06:00 - 09:00 PM Today
              </ResponsiveText>
              <ResponsiveText color={colors.green9} size={3}>
                Free Delivery on shopping of Rs:2999
              </ResponsiveText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: "row" }}>
              <Icon source={globalPath.calendar} />
              <ResponsiveText margin={[0, 0, 0, 10]} size={3.4}>
                Delivery Day
              </ResponsiveText>
            </View>

            <DropDown
              defaultButtonText={Days.find((v)=>v.value==selectedDay)?.text}
              data={Days.map((item) => item.text)}
              onSelect={(item)=>{

              }}
            />
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: "row" }}>
              <Icon source={globalPath.clock} />
              <ResponsiveText margin={[0, 0, 0, 10]} size={3.4}>
                Delivery Window
              </ResponsiveText>
            </View>
            <DropDown
              defaultButtonText={TimeSlots.find((v)=>v.value==selectedTimeSlot)?.text}
              data={TimeSlots.map((item) => item.text)}
            />
          </View>
        </View>

        <View style={styles.container1}>
          <View style={styles.row}>
            <ResponsiveText>Delivery Location</ResponsiveText>
            <View style={{ flexDirection: "row" }}>
              <Icon source={globalPath.edit} />
              <ResponsiveText margin={[0, 0, 0, 5]} size={3.4}>
                Edit
              </ResponsiveText>
            </View>
          </View>
          <Image style={styles.mapStyle} source={globalPath.map} />
        </View>
        <View style={styles.container1}>
          <ResponsiveText margin={[10]} size={4.5}>
            Select Payment Method
          </ResponsiveText>

          <View style={styles.row}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Icon source={globalPath.cash} />
              <ResponsiveText margin={[0, 0, 0, 10]} size={3.4}>
                Cash on Delivery
              </ResponsiveText>
            </View>
            <Icon source={globalPath.right_arrow_bullet} />
          </View>
          <RnButton title={"PLACE ORDER"} onPress={submit} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Checkout;

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
  dropDown: {
    width: wp(45),
    backgroundColor: colors.lightGrey,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapStyle: {
    width: wp(90),
    height: hp(25),
    borderRadius: 12,
    alignSelf: "center",
    marginVertical: 5,
  },
});
