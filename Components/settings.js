import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, ImageBackground} from "react-native";

class SettingsScreen extends React.Component{

    _userLogout = async () => {
        try{
          this.props.firebase.logout();
        }catch(error) {
          // this.setState({message: this.errorMsgHandler.handleAuthErrMsg(error.code)});
          console.log(error);
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
                <View>
                    <TouchableOpacity style={styles.btn} onPress={this._userLogout}>
                        <Text style={styles.btnText}>LOGOUT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={this._displayManual}>
                        <Text style={styles.btnText}>USER MANUAL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={this._displayAbout}>
                        <Text style={styles.btnText}>ABOUT</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "stretch"
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  helperText: {
    marginTop: 20,
    color: "#777777",
    fontSize: 12
  },
  btn: {
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

export default SettingsScreen;