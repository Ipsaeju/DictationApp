import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, FlatList, Alert } from "react-native";
import { withFirebaseHOC } from '../Firebase';
import { uploadToFilezilla } from "../Firebase/ftpupload";

class Viewer extends React.Component{

    state = {
        dictationName: this.props.route.params
    }
    _onDelete = async () => {
        try{
            await this.props.firebase.deleteDictation(this.state.dictationName);
            Alert.alert("Dictation was succesfully deleted.");
            this.props.navigation.navigate("Dashboard");
        }catch(error){
            console.log(error);
        }
    }

    _onSend = async () => {
        try{
            await uploadToFilezilla(this.state.dictationName);
        }catch(error){
            console.log(error);
        }
    }

    render() {
        return(
            <Text style={styles.helperText}>{this.props.route.params}</Text>
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

export default withFirebaseHOC(Viewer);
