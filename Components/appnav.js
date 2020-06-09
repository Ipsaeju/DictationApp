import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import Register from "./register";
import ForgotPass from "./forgotpass";
import Dashboard from "./dashboard";
import Preload from "./preload";
import Recorder from "./recorder";

const AppNav = createStackNavigator();

function StackNav() {
  return(
    <AppNav.Navigator initialRouteName="Preload">
        <AppNav.Screen name="Preload" component={Preload}/>
        <AppNav.Screen name="Login" component={Login}/>
        <AppNav.Screen name="Register" component={Register}/>
        <AppNav.Screen name="Forgot Password" component={ForgotPass}/>
        <AppNav.Screen name="Dashboard" component={Dashboard}/>
        <AppNav.Screen name="Recorder" component={Recorder}/>
      </AppNav.Navigator>
  );
}

export default StackNav;
