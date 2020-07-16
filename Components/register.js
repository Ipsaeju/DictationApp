import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { withFirebaseHOC } from '../Firebase';
import { ScrollView } from "react-native-gesture-handler";
import { _handleAuthErr } from "./Alerts/errors";

class Register extends React.Component {
  _isMounted = false;
  state = {
    email: "",
    password: "",
    confirmPass: "",
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

  _createAccount = async () => {
    var params = {
      email: this.state.email,
      password: this.state.password,
      confirmPass: this.state.confirmPass
    };

    if((params.password !== params.confirmPass) && (this._isMounted)) this.setState({message: "The password does not match"});

    try{
      const response = await this.props.firebase.register(params.email, params.password);
      if(response.user.uid){
        this.props.navigation.navigate("Login");
      }
    }catch(error){
      if(this._isMounted){
        this.setState({message: _handleAuthErr(error.code)});
      }
    }
  }

  render() {
    return (
      <ImageBackground source={require("../Assets/MedicalBackground.png")} style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
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
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#808080"
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Re-enter Password"
            placeholderTextColor="#808080"
            onChangeText={text => this.setState({ confirmPass: text })}
          />
        </View>
        <TouchableOpacity style={styles.registerBtn} 
          disabled={!this.state.email || !this.state.password || !this.state.confirmPass} 
          onPress={this._createAccount}>
          <Text style={styles.btnText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Already have an account?</Text>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={styles.btnText}>RETURN TO LOGIN</Text>
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
  inputView: {
    width: "80%",
    backgroundColor: "#ababab",
    borderRadius: 25,
    height: 50,
    marginBottom: 18,
    marginTop: 15,
    justifyContent: "center",
    padding: 25,
    opacity: 80
  },
  inputText: {
    height: 50,
    color: "#1a1a1a"
  },
  helperText: {
    marginTop: 18,
    marginBottom: 4,
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
  titleText: {
    color: "#555555",
    marginTop: 18,
    marginBottom: 8,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600"
  },
  registerBtn: {
    width: "80%",
    backgroundColor: "#1754e3",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5
  },
  btnText: {
    color: "white"
  }
});

export default withFirebaseHOC(Register);