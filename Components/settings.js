import React from "react";
import { Text, TouchableOpacity, StyleSheet, ImageBackground} from "react-native";
import { withFirebaseHOC } from '../Firebase';
import { _handleAuthErr } from "./Alerts/errors";

class SettingsScreen extends React.Component{

  state = {
    message: ""
  };

  componentDidMount = () => {
    this.setState({message: ""});
  }

  componentDidUpdate = () => {
    setTimeout(() => this.setState({message: ""}), 4000);
  }
  
  _userLogout = async () => {
      try{
        this.props.firebase.logout();
      }catch(error) {
        this.setState({message: _handleAuthErr(error.code)});
      }
  }

  _displayManual = () => {
      //TODO: Make user manual
  }

  _displayAbout = () => {

  }

    render() {
        return(
            <ImageBackground source={require("../Assets/MedicalBackground.png")} style={styles.container}>
                <TouchableOpacity style={styles.btn} onPress={this._userLogout}>
                  <Text style={styles.btnText}>LOGOUT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={this._displayManual}>
                  <Text style={styles.btnText}>USER MANUAL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={this._displayAbout}>
                  <Text style={styles.btnText}>ABOUT</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  helperText: {
    marginTop: 20,
    color: "#777777",
    fontSize: 12
  },
  btn: {
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

export default withFirebaseHOC(SettingsScreen);