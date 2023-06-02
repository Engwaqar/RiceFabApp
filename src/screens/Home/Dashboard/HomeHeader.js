import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "../../../components/Icon";
import ResponsiveText from "../../../components/RnText";
import { colors } from "../../../constants/colorsPallet";
import { globalPath } from "../../../constants/globalPath";
import { hp, wp } from "../../../helpers/Responsiveness";
import { routeName } from "../../../constants/routeName";
import { useNavigation } from "@react-navigation/native";

const HomeHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
        <Image style={{width:wp(25),height:hp(5),resizeMode:'contain'}} source={globalPath.homelogo} />
        <View style={{flexDirection:'row'}} >

        {/* <Icon size={wp(5)} margin={[0,10,0,0]} source={globalPath.notification} /> */}
        <TouchableOpacity onPress={() => navigation.navigate(routeName.PROFILE)}>
        <Icon size={wp(5)} source={globalPath.profile} />
        </TouchableOpacity>
        </View>

        
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:wp(4),
    paddingBottom:10
  },
});
