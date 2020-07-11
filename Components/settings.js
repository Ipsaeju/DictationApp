import React from "react";
import { Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Image, View, ScrollView } from "react-native";
import { withFirebaseHOC } from '../Firebase';
import { _handleAuthErr } from "./Alerts/errors";
import Icon from "react-native-vector-icons/Feather";
import aboutTxt from "../Assets/abouttxt";

class SettingsScreen extends React.Component{
  _isMounted = false;

  state = {
    message: "",
    settingsModalVisible: false
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.setState({
      message: "",
      settingsModalVisible: false
    });
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  componentDidUpdate = () => {
    setTimeout(() => this.setState({message: ""}), 4000);
  }

  _userLogout = async () => {
    try{
      this.props.firebase.logout();
    }catch(error) {
      if(this._isMounted){
        this.setState({message: _handleAuthErr(error.code)});
      }
    }
  }

  _displayManual = () => {
      //TODO: Make user manual
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
        <TouchableOpacity style={styles.btn} onPress={() => {this.setState({settingsModalVisible: true})}}>
          <Text style={styles.btnText}>ABOUT</Text>
        </TouchableOpacity>
        <View style={styles.aboutModal}>
          <Modal animationType="slide" transparent={false} visible={this.state.settingsModalVisible}>
            <ScrollView>
              <View style={styles.aboutScreen}>
                <View style={styles.closeBtn}>
                  <TouchableOpacity onPress={() => {this.setState({settingsModalVisible: false})}}>
                    <Icon name="x" size={24} color="#555555"/>
                  </TouchableOpacity>
                </View>
                <View style={styles.aboutContents}>
                  <Image source={require("../Assets/MDSolutionsLogoSquare.png")}/>
                  <Text style={styles.titleText}>m⁺ Scribe</Text>
                  <Text style={styles.subTitleText}>MD Solutions</Text>
                  <Text style={styles.subTitleText}>https://www.mdsolutions.org</Text>
                  <Text style={styles.subtext}>{aboutTxt}</Text>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
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
  },
  aboutModal: {
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#333333",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    margin: 20,
  },
  aboutScreen: {
    flex: 1
  },
  closeBtn: {
    direction: "rtl",
    flexDirection: "column",
    paddingBottom: 20
  },
  aboutContents: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  titleText: {
    color: "#777777",
    fontSize: 26
  },
  subTitleText: {
    color: "#888888",
    fontSize: 16,
    textAlign: "center"
  },
  subtext: {
    color: "#888888",
    fontSize: 16,
    textAlign: "justify"
  }

});

export default withFirebaseHOC(SettingsScreen);