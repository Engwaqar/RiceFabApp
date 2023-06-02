import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { routeName } from '../constants/routeName';
import Login from '../screens/Auth/Login/Login';
import PersonalInfo from '../screens/Auth/Login/PersonalInfo';
import Register from '../screens/Auth/Login/Register';
import Verification from '../screens/Auth/Login/Verification';
import VerifyNumber from '../screens/Auth/Login/VerifyNumber';
import Splash from '../screens/Auth/splash/Splash';
import BottomTabs from './BottomTabs';
import HomeStack from './HomeStack';
import SideDrawer from './SideDrawer';
import ForgetPassword from '../screens/Auth/Login/ForgetPassword';

const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
     initialRouteName={routeName.SPLASH}
    >
      <Stack.Screen name={routeName.SPLASH} component={Splash} />  
      <Stack.Screen name={routeName.LOGIN} component={Login} /> 
      <Stack.Screen name={routeName.REGISTER} component={Register} /> 
      <Stack.Screen name={routeName.FORGET_PASSWORD} component={ForgetPassword} /> 
      <Stack.Screen name={routeName.PERSONAL_INFO} component={PersonalInfo} /> 
      <Stack.Screen name={routeName.VERIFY_NUMBER} component={VerifyNumber} /> 
      <Stack.Screen name={routeName.VERIFICATION} component={Verification} /> 

      <Stack.Screen name={routeName.SIDE_DRAWER} component={SideDrawer} /> 
      <Stack.Screen name={routeName.BOTTOM_TABS} component={BottomTabs} /> 

     


    </Stack.Navigator>
  )
}
export default AuthStack
