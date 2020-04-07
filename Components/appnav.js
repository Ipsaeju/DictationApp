import { createStackNavigator } from "react-navigation";
import Login from "./login";
import Register from "./register";
import ForgotPass from "./forgotpass";
import Dashboard from "./dashboard"

const AppNav = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  ForgotPass: { screen: ForgotPass },
  Dashboard: { screen: Dashboard }
  },
  {
    initialRouteName: "Login"
  });

export default AppNav;
