import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { withFirebaseHOC } from '../Firebase/firebase';

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPass: "",
    message: "",
    canRegister: false
  };

  _createAccount = async () => {
    this.setState({message: "", canRegister: false});

    var params = {
      email: this.state.email,
      password: this.state.password,
      confirmPass: this.state.confirmPass
    };

    if(params.password !== params.confirmPass) this.setState({message: "The password does not match", 
    canRegister: false});
    else this.setState({canRegister: true});

    if(canRegister){
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

  }

  render() {
    return (
      <View style={styles.container}>
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
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Re-enter Password"
            placeholderTextColor="#003f5c"
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
          onPress={() => this.props.navigation.goBack()}
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
  registerBtn: {
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

export default withFirebaseHOC(Register);