import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { withFirebaseHOC } from '../Firebase';
import DictationsList from "./dictationslist";
import ErrorMsgHandler from "./Alerts/errors";

class Dashboard extends React.Component {

  state = {
    user: this.props.firebase.getCurrUserEmail(),
    message: ""
  };

  // constructor(dictationList = new DictationsList(), errorMsgHandler = new ErrorMsgHandler()){
  //   this.dictationList = dictationList;
  //   this.errorMsgHandler = errorMsgHandler;
  //   this.dictationList._listDictations();
  // }
  
  _userLogout = async () => {
    try{
      await this.props.firebase.logout();
    }catch(error) {
      this.setState({message: this.errorMsgHandler.handleAuthErrMsg(error.code)});
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={this._userLogout}>
          <Text style={styles.btnText}>LOGOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.props.navigation.navigate("Recorder")}>
          <Text style={styles.btnText}>Make Dictation</Text>
        </TouchableOpacity>
      </View>
    
    );
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
  warningText: {
    color: "red",
    fontSize: 12,
    padding: 5
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

export default withFirebaseHOC(Dashboard);
