import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class ForgotPass extends React.Component {
  state = {
    email: ""
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.helperText}>
          Enter the Email you registered with and a reset code will be sent to
          your email
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.btnText}>RESET PASSWORD</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Don't need to reset password?</Text>
        <TouchableOpacity
          style={styles.btns}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.btnText}>RETURN TO LOGIN</Text>
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
  btns: {
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
