import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../constants/colorsPallet";
import { hp, wp } from "../../../helpers/Responsiveness";
import HomeHeader from "./HomeHeader";
import { routeName } from "../../../constants/routeName";
import { globalPath } from "../../../constants/globalPath";
import ResponsiveText from "../../../components/RnText";
import Icon from "../../../components/Icon";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getCartList, getProducts, getProfile } from "../../../redux/actions/user.actions";
import Api from "../../../redux/lib/api";
import urls from "../../../redux/lib/urls";
import SlideShow from "../../../components/SlideShow";
import Loader from "../../../components/Loader";
import RecordNotFound from "../../../components/RecordnotFound";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.userReducers.productData.data);
  const Loading = useSelector((state) => state.userReducers.productData.refreshing);

  const [BannerData, setBannerData] = useState([]);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getProducts());
    dispatch(getCartList());

    getBanner();
  }, []);

  const getBanner = async () => {
    try {
      const res = await Api.get(urls.GET_BANNERS);
      console.log("banners res", res);
      if (res && res.success == true) {
        setBannerData(res.data);
      } else {
      }
    } catch (error) { }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["left", "top", "right"]}
    >
      <HomeHeader />
      <View style={styles.container1}>
        <ScrollView>
          <View style={styles.banner}>
            <SlideShow data={BannerData} />
          </View>
          {productData.length > 0 ?
            productData.map((item) => (
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={() =>navigation.navigate(routeName.PRODUCT_DETAIL, item)}
              >
                <Icon
                  size={wp(20)}
                  source={
                    item.fullPath ? { uri: item.fullPath } : globalPath.product
                  }
                />
                <View style={{ flex: 0.9 }}>
                  <ResponsiveText size={3.3}>{item.name}</ResponsiveText>
                  <ResponsiveText
                    size={3.3}
                    color={colors.grey1}
                    margin={[10, 0, 5, 0]}
                  >
                    Weight: {item.weight} {item.unit}
                  </ResponsiveText>
                  <ResponsiveText size={3.3}>Rs: {item.price}</ResponsiveText>
                </View>
                <TouchableOpacity style={styles.cartBtn} onPress={() =>
                  navigation.navigate(routeName.PRODUCT_DETAIL, item)
                }>
                  <ResponsiveText size={2.8} color={colors.secondary}>
                    ADD TO CART
                  </ResponsiveText>
                </TouchableOpacity>
              </TouchableOpacity>
            )) : (Loading == false ?
              <RecordNotFound />
              : null
            )}
        </ScrollView>
      </View>
      {Loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  iconStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(2),
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 9,
    shadowColor: colors.grey1,
    shadowOpacity: 0.2,
    // padding: 25,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginBottom: hp(2),
  },
  banner: {
    width: wp(90),
    height: hp(20),
    alignSelf: "center",
    marginVertical: hp(2),
    borderRadius: 20,
  },

  container1: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: wp(4),
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
