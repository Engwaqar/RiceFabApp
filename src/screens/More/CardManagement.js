import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Container from "../../components/Container";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { colors } from "../../constants/colorsPallet";
import { _toast } from "../../constants/Index";

import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import RnButton from "../../components/RnButton";
import { routeName } from "../../constants/routeName";
import { useDispatch, useSelector } from "react-redux";
import { getAllCard } from "../../redux/actions/user.actions";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";

const CardManagement = ({ navigation }) => {
  const dispatch = useDispatch();
  const allCards = useSelector(
    (state) => state.userReducers.allCards.data
  );
  const Data = [
    {
      title: "home",
      icon: require("../../assets/Images/visa.png"),
    },
    {
      title: "Order",
      icon: require("../../assets/Images/paypal.png"),
    },
    {
      title: "My Cart",
      icon: require("../../assets/Images/mastercard.png"),
    },
    {
      title: "My Profile",
      icon: require("../../assets/Images/maestro.png"),
    },
    {
      title: "Order Tracking",
      icon: require("../../assets/Images/americanexpress.png"),
    },
    {
      title: "Card Management",
      icon: require("../../assets/Images/discover-network.png"),
    },
  ];

  useEffect(() => {
    dispatch(getAllCard());
  
  }, []);

  const DELETEItem = async (id) => {
    try {
      const res = await Api.delete(urls.DELETE_CARD + id);
      console.log("delete cradr", res);
      if (res && res.success == true) {
        _toast(res.message);
        dispatch(getAllCard());
      } else {
        _toast(res.message);
      }
    } catch (error) {}
  };

  return (
    <Container title={"Card Management"} navigation={navigation}>
      {allCards.map((item) => (
        <TouchableOpacity style={styles.listView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              width={wp(13)}
              height={hp(4)}
              resizeMode="stretch"
              source={Data[2].icon}
            />
            <ResponsiveText margin={[0, 0, 0, 10]} color={colors.grey1}>
              {item.cardNumber}
            </ResponsiveText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() =>
                navigation.navigate(routeName.ADD_CARD, { title: "Edit Card" ,data:item})
              }
            >
              <Icon source={globalPath.edit} tintColor={colors.black} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>DELETEItem(item.id)} >
              <Icon source={globalPath.deleteIcon}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      <RnButton
        onPress={() =>
          navigation.navigate(routeName.ADD_CARD, { title: "Add Card" })
        }
        margin={[hp(5), 0, 0, 0]}
        title={"ADD CARD"}
      />
    </Container>
  );
};

export default CardManagement;

const styles = StyleSheet.create({
  listView: {
    flexDirection: "row",
    padding: 15,
    paddingHorizontal: wp(5),
    width: wp(90),
    backgroundColor: colors.white,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(2),
    borderRadius: 10,
    elevation: 9,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
