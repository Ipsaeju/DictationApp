import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { withFirebaseHOC } from '../Firebase';
import { uploadToFilezilla } from "../Firebase/ftpupload";
import { _onDeleteDictation } from "./Alerts/warnings";
import { _handleStoreErr } from "./Alerts/errors";

class Viewer extends React.Component{
  state = {
    dictationName: this.props.route.params.dictationName,
    dictationPath: this.props.route.params.dictationPath,
    message: ""
  };

  componentDidUpdate = () => {
    setTimeout(() => this.setState({message: ""}), 4000);
  }

  _onDelete = async () => {
    try{
      let resp = await _onDeleteDictation();
      if(resp === true){
        await this.props.firebase.deleteDictation(this.state.dictationName);
        Alert.alert("Dictation was succesfully deleted.");
        this.props.navigation.navigate("DashList");
      }
    }catch(error){
      this.setState({message: _handleStoreErr(error.code)});
    }
  };

  _onSend = async () => {
    try{
      await uploadToFilezilla(this.state.dictationPath, this.props.firebase.getCurrUserEmail(), this.state.dictationName);
      Alert.alert("Dictation successfully sent.");
      this.props.navigation.navigate("DashList");
    }catch(error){
      this.setState({message: "There was an error in sending the dictation to FileZilla. Please try again or contact a system admin."});
    }
  };

  render() {
    return(
      <View style={styles.container}>
        {!!this.state.message && (
          <Text style={styles.warningText}>
            {this.state.message}
          </Text>
        )}
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
    fontSize: 20,
    padding: 5,
    textAlign: "center"
  },
  warningText: {
    color: "white",
    fontSize: 18,
    padding: 5,
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 15
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
