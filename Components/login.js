import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import auth from "@react-native-firebase/auth";
import { withFirebaseHOC } from '../Firebase/firebase';

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    message: ""  
  };

  _userLogin = async () => {
    this.setState({message: ""});

    var params = {
      email: this.state.email,
      password: this.state.password
    };

    try{
      const response = await this.props.firebase.login(params.email, params.password);
      if(response.user) this.props.navigation.navigate("Dashboard");
    }catch(error) {
      this.setState({message: error.message});
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>MD Scribe</Text>
        {!!this.state.message && (
					<Text style={styles.warningText}>
						{this.state.message}
					</Text>
				)}
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity>
          <Text
            style={styles.helperText}
            onPress={() => this.props.navigation.navigate("ForgotPass")}
          >
            Reset Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} disabled={!this.state.email||!this.state.password}
        onPress={this._userLogin}>
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.btnText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  helperText: {
    marginTop: 20,
    color: "white",
    fontSize: 12
  },
  warningText: {
    color: "Red",
    fontSize: 12,
    padding: 5
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  btnText: {
    color: "white"
  }
});

export default withFirebaseHOC(Login);