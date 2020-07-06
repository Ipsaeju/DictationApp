import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { withFirebaseHOC } from '../Firebase';
import { _onSuccessfulReset } from "./Alerts/warnings";
import { _handleAuthErr } from "./Alerts/errors";

class ForgotPass extends React.Component {
  state = {
    email: ""
  };

  _resetPassword = async () => {
    var params = {
      email: this.state.email
    };

    try{
      await this.props.firebase.resetPass(params.email);
      await _onSuccessfulReset();
      this.props.navigation.navigate("Login");
    }catch(error){
      Alert.alert(_handleAuthErr(error.code));
    }
  }

  render() {
    return (
      <View>
        <ImageBackground source={require("../Assets/MedicalBackground.png")} style={styles.container}>
          <Text style={styles.titleText}>Password Recovery</Text>
          <Text style={styles.instructionsText}>
            Enter the email you registered with and
          </Text>
          <Text style={styles.instructionsText}>
            a reset code will be sent to that email
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email Address"
              placeholderTextColor="#808080"
              onChangeText={text => this.setState({ email: text })}/>
          </View>
          <TouchableOpacity style={styles.btns} onPress={this._resetPassword}>
            <Text style={styles.btnText}>RESET PASSWORD</Text>
          </TouchableOpacity>
          <Text style={styles.helperText}>Don't need to reset password?</Text>
          <TouchableOpacity
            style={styles.btns}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.btnText}>GO BACK</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8cc6ff",
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
    backgroundColor: "#ababab",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    marginTop: 10,
    justifyContent: "center",
    padding: 20,
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
  instructionsText: {
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
  btns: {
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

export default withFirebaseHOC(ForgotPass);