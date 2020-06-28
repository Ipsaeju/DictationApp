import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { withFirebaseHOC } from '../Firebase';
import { uploadToFilezilla } from "../Firebase/ftpupload";
import { _onDeleteDictation } from "./Alerts/warnings";

class Viewer extends React.Component{
  state = {
    dictationName: this.props.route.params.dictationName,
    dictationPath: this.props.route.params.dictationPath
  };

  _onDelete = async () => {
    
      try{
        let resp = await _onDeleteDictation();
        if(resp === true){
          await this.props.firebase.deleteDictation(this.state.dictationName);
          Alert.alert("Dictation was succesfully deleted.");
          this.props.navigation.navigate("DashList");
        }
      }catch(error){
          console.log(error);
      }
  };

  _onSend = async () => {
    try{
      await uploadToFilezilla(this.state.dictationPath);
    }catch(error){
      console.log(error);
    }
  };

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.titleText}>What would you like to do with {this.state.dictationName}?</Text>
        <TouchableOpacity style={styles.btn} onPress={this._onDelete}>
          <Text style={styles.btnText}>Delete Dictation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this._onSend}>
          <Text style={styles.btnText}>Upload to FileZilla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate("DashList")}>
          <Text style={styles.btnText}>Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  titleText: {
    color: "#777777",
    fontSize: 22,
    padding: 5,
    textAlign: "center"
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

export default withFirebaseHOC(Viewer);
