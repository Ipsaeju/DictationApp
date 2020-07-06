import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DashList from "./dashlist";
import Viewer from "./viewer";

const viewNav = createStackNavigator();

function viewStack() {
  return(
    <viewNav.Navigator initialRouteName="DashList" screenOptions={{
      headerShown: false}}>
        <viewNav.Screen name="DashList" component={DashList} options={{title: "Welcome Back!"}}/>
        <viewNav.Screen name="Viewer" component={Viewer}/>
      </viewNav.Navigator>
  );
}

export default viewStack;
