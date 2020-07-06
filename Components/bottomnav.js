import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Feather";
import Recorder from "./recorder";
import SettingsScreen from "./settings";
import viewStack from "./viewnav";

const bottomTab = createBottomTabNavigator();

function bottomNav() {
    return(
        <bottomTab.Navigator initialRouteName="Dashboard">
            <bottomTab.Screen name="Dashboard" component={viewStack}
                options={{tabBarLabel: "Dashboard", tabBarIcon: () => (
                    <Icon name="trello" size={18} color="black"/>
                )}}/>
            <bottomTab.Screen name="Recorder" component={Recorder}
                options={{tabBarLabel: "Record", tabBarIcon: () => (
                    <Icon name="mic" size={18} color="black"/>
                )}}/>
            <bottomTab.Screen name="Settings" component={SettingsScreen} 
                options={{tabBarLabel: "Settings", tabBarIcon: () => (
                    <Icon name="settings" size={18} color="black"/>
                )}}/>
        </bottomTab.Navigator>
    );
}

export default bottomNav;