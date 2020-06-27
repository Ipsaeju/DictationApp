import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Feather";
import Recorder from "./recorder";
import Dashboard from "./dashboard";
import SettingsScreen from "./settings";

const bottomTab = createBottomTabNavigator();

function bottomNav() {
    return(
        <bottomTab.Navigator>
            <bottomTab.Screen name="Settings" component={SettingsScreen} 
                options={{tabBarLabel: "Settings", tabBarIcon: () => (
                    <Icon name="settings" size={12} color="black"/>
                )}}/>
            <bottomTab.Screen name="Dashboard" component={Dashboard}
                options={{tabBarLabel: "Dashboard", tabBarIcon: () => (
                    <Icon name="trello" size={12} color="black"/>
                )}}/>
            <bottomTab.Screen name="Recorder" component={Recorder}
                options={{tabBarLabel: "Record", tabBarIcon: () => (
                    <Icon name="mic" size={12} color="black"/>
                )}}/>
        </bottomTab.Navigator>
    );
}

export default bottomNav;