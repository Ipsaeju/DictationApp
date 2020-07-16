import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from "react-native";
import { withFirebaseHOC } from '../Firebase';
import { _handleAuthErr } from "./Alerts/errors";

class Login extends React.Component {
  _isMounted = false;
  state = {
    email: "",
    password: "",
    message: ""  
  };

  componentDidMount = () => {
    this._isMounted = true;
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  componentDidUpdate = () => {
    setTimeout(() => this.setState({message: ""}), 7000);
  }

  _userLogin = async () => {
    if(this._isMounted){
      var params = {
        email: this.state.email,
        password: this.state.password
      };
    }
    try{
      const response = await this.props.firebase.login(params.email, params.password);
      if(response.user) this.props.navigation.navigate("Dashboard");
    }catch(error) {
      if(this._isMounted){
        this.setState({message: _handleAuthErr(error.code)});
      }
    }
  }

  render() {
    return (
      <ImageBackground source={require("../Assets/MedicalBackground.png")} style={styles.container}>
        <Image source={require("../Assets/MDSolutionsLogoSquare.png")}/>
        <Text style={styles.logo}>m⁺ Scribe</Text>
        {!!this.state.message && (
          <Text style={styles.warningText}>
            {this.state.message}
          </Text>
        )}
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#808080"
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
            placeholderTextColor="#808080"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity>
          <Text
            style={styles.helperText}
            onPress={() => this.props.navigation.navigate("Forgot Password")}>
            Forgot Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} disabled={!this.state.email||!this.state.password}
        onPress={this._userLogin}>
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={styles.btnText}>REGISTER</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontWeight: "300",
    fontSize: 50,
    fontFamily: "Roboto",
    color: "#0266e0",
    marginTop: 20,
    marginBottom: 20
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ababab",
    borderRadius: 25,
    height: 50,
    marginBottom: 8,
    marginTop: 12,
    justifyContent: "center",
    padding: 20,
    opacity: 80
  },
  inputText: {
    height: 50,
    color: "#1a1a1a"
  },
  helperText: {
    marginTop: 4,
    marginBottom: 18,
    color: "#525252",
    fontSize: 16
  },
  warningText: {
    color: "white",
    fontSize: 18,
    padding: 5,
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 15
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#1754e3",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  btnText: {
    color: "white"
  }
});

export default withFirebaseHOC(Login);