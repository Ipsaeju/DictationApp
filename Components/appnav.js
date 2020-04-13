import { createStackNavigator } from "react-navigation";
import Login from "./login";
import Register from "./register";
import ForgotPass from "./forgotpass";
import Dashboard from "./dashboard"
import Preload from "./preload"

const AppNav = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  ForgotPass: { screen: ForgotPass },
  Dashboard: { screen: Dashboard },
  Preload: { screen: Preload}
  },
  {
    initialRouteName: "Preload"
  });

export default AppNav;
