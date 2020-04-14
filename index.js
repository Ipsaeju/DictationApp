import { createAppContainer, createSwitchNavigator } from "@react-navigation/native";
import Appnav from "./Components/appnav";

const SwitchNav = createSwitchNavigator({
    App: Appnav
});

const AppContainer = createAppContainer(SwitchNav);
export default AppContainer;