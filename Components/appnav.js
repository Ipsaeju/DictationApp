import { createStackNavigator } from "react-navigation";
import Login from "./login";
import Register from "./register";
import ForgotPass from "./forgotpass";

const AppNav = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  ForgotPass: { screen: ForgotPass }
});

export default AppNav;
