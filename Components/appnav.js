import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import Register from "./register";
import ForgotPass from "./forgotpass";
import Dashboard from "./dashboard";
import Preload from "./preload";
import Recorder from "./recorder";
import Viewer from "./viewer";
import bottomNav from "./bottomnav";

const AppNav = createStackNavigator();

function StackNav() {
  return(
    <AppNav.Navigator initialRouteName="Preload" screenOptions={{
      headerShown: false}}>
        <AppNav.Screen name="Preload" component={Preload}/>
        <AppNav.Screen name="Login" component={Login}/>
        <AppNav.Screen name="Register" component={Register}/>
        <AppNav.Screen name="Forgot Password" component={ForgotPass}/>
        <AppNav.Screen name="Viewer" component={Viewer}/>
        <AppNav.Screen name="Dashboard" component={bottomNav}/>
      </AppNav.Navigator>
  );
}

export default StackNav;
