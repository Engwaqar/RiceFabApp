import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { colors } from "../constants/colorsPallet";
import FastImage from "react-native-fast-image";
import { hp, wp } from "../helpers/Responsiveness";
const SlideShow = ({data}) => {
  return (
    <>
      {data.length === undefined ? undefined : (
        <Swiper
          // style={{width:wp(95)}}
          // containerStyle={{borderRadius:25}}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={3}
          removeClippedSubviews={true}
          key={data.length} //if autoplay not working try this
          activeDot={
            <View
              style={{
                backgroundColor: colors.primary,
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: -20,
              }}
            />
          }
          dot={
            <View
              style={{
                backgroundColor: colors.white,
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: -20,
              }}
            />
          }
        >
          {data.map((item, index) => {
            return (
              <FastImage
                resizeMode="stretch"
                imageStyle={{ opacity: 1 }}
                style={styles.banner}
                // source={item}
                source={{
                  priority: FastImage.priority.high,
                  uri: item.fullPath,
                }}
              />
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default SlideShow;

const styles = StyleSheet.create({
  banner: {
    width: wp(90),
    height: hp(20),
    alignSelf: "center",
    borderRadius: 20,
  },
});
