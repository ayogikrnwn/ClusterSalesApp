// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import DetailProducts from '../pages/DetailProducts';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SplashScreen from '../pages/SplashScreen';
import MyTabBar from '../component/MyTabBar'
import Appointment from '../pages/Appointment';
import Register from '../pages/Login/Register';
import AddDataLeads from '../pages/Home/AddDataLeads';



// import Login from '../screen/Login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Leads" component={Home} />
      <Tab.Screen name="Appointment" component={Appointment} />
     
     

    </Tab.Navigator>
  );
}
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
       
       <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{headerShown: false}}
    />
     <Stack.Screen
      name="MyTabs"
      component={MyTabs}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
     <Stack.Screen
      name="AddLeads"
      component={AddDataLeads}
      options={{headerShown: false}}
    />
  <Stack.Screen
      name="Register"
      component={Register}
      options={{headerShown: false}}
    />
<Stack.Screen
      name="Home"
      component={Home}
      options={{headerShown: false}}
    />
   <Stack.Screen
      name="DetailProd"
      component={DetailProducts}
      options={{headerShown: false}}
    />
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})