import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { withFirebaseHOC } from '../Firebase';

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
      <ScrollView>
        <View style={styles.container}>
          <Image source={require("../Assets/MDSolutionsLogo.png")}/>
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
              placeholderTextColor="#c7f1ff"
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
              placeholderTextColor="#c7f1ff"
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
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={styles.btnText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8cc6ff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10
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
    backgroundColor: "#7596a1",
    borderRadius: 25,
    height: 50,
    marginBottom: 8,
    marginTop: 12,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  helperText: {
    marginTop: 4,
    marginBottom: 18,
    color: "white",
    fontSize: 16
  },
  warningText: {
    color: "red",
    fontSize: 20,
    padding: 5
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