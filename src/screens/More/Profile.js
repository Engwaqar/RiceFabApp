import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../components/Container";
import { globalPath } from "../../constants/globalPath";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import ProfileView from "./ProfileView";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const Profile = ({ navigation }) => {
  const profileData = useSelector((state) => state.userReducers.profileData.data);
  const Loading = useSelector((state) => state.userReducers.profileData.refreshing);

  return (
    <Container navigation={navigation} title={"Profile"}>
      <Image
        style={{
          width: wp(30),
          height: wp(30),
          backgroundColor: colors.lighterGrey,
          borderRadius:wp(15),
          resizeMode:'contain',
          alignSelf:'center',
          marginTop:hp(3)
        }}
        source={globalPath.profile}
      />
      <ResponsiveText margin={[10,0,hp(3),0]} textAlign={'center'} size={4.5} >{profileData.fullName}</ResponsiveText>
      <View style={styles.container1} >
        <ProfileView 
         title='Full Name'
         value={profileData.fullName}
         icon={globalPath.profile}
         />
         <ProfileView 
         title='Email'
         value={profileData.email}
         icon={globalPath.EmailIcon}
         />
         <ProfileView 
         title='Password'
         value='********'
         icon={globalPath.LockIcon}
         />
         <ProfileView 
         title='Phone'
         value={profileData.contactNumber}
         icon={globalPath.call}
         />
         <ProfileView 
         title='Address'
         value={profileData.address}
         icon={globalPath.address}
         />
      </View>
      {Loading ? <Loader /> : null}
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: wp(6),
        padding: wp(5),
        width: wp(100),
        elevation: 9,
        shadowColor: colors.grey1,
        shadowOpacity: 0.3,
        // padding: 25,
        shadowOffset: {
          width: 0,
          height: 0,
        },}
});
