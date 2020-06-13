import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { withFirebaseHOC } from '../Firebase';
import { ScrollView } from "react-native-gesture-handler";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPass: "",
    message: ""
  };

  _createAccount = async () => {
    this.setState({message: ""});

    var params = {
      email: this.state.email,
      password: this.state.password,
      confirmPass: this.state.confirmPass
    };

    if(params.password !== params.confirmPass) this.setState({message: "The password does not match"});

    try{
      const response = await this.props.firebase.register(params.email, params.password);
      if(response.user.uid){
        const { uid } = response.user;
        const userInfo = { email, password, uid };
        await this.props.firebase.newUserAdd(userInfo);
        this.props.navigation.navigate("Login");
      }
    }catch(error){
      if(error.code === 'auth/email-already-in-use') 
      this.setState({message: "This email is already in use!"});
      if(error.code === 'auth/invalid-email') this.setState({message: "This email is invalid!"});
    }

  }

  render() {
    return (
      <View>
        <ScrollView>
          <ImageBackground source={require("../Assets/MedicalBackground.png")} style={styles.container}>
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 60
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ababab",
    borderRadius: 25,
    height: 50,
    marginBottom: 18,
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
  warningText: {
    color: "red",
    fontSize: 28,
    padding: 5
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