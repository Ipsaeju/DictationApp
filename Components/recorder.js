import React from "react";
import { RNVoiceRecorder } from "react-native-voice-recorder";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView, Alert} from "react-native";
import { _onDeleteDictation } from "./Alerts/warnings";
import { withFirebaseHOC } from '../Firebase';

let recordingPath;
class Recorder extends React.Component{
  state = {
    dictationName: "",
    message: "",
    successMessage: ""
  };

  _onRecord = async () => {
    if(this.state.dictationName == null || this.state.dictationName == ""){
      this.setState({message: "Name the dictation audio first before recording!"});
    }
    else{
      RNVoiceRecorder.Record({
        format: "wav",
        onDone: async (path) => {
          let file = path;
          recordingPath = path;
          let metadata = {
            name: this.state.dictationName,
            recorder: this.props.firebase.getCurrUserEmail()
          };
          try{
            let uploadTask = await this.props.firebase.uploadToReference(file, metadata, this.state.dictationName);
            this.setState({successMessage: "Upload success"});
            console.log(uploadTask);
          }catch(error){
            console.log(error);
          }
        },
        onCancel: () => {
          this.setState({message: "Cancelled recording"});
        }
      });
    }
    
  }

  _onPlayback = () => {
    if(recordingPath != null){
      RNVoiceRecorder.Play({
        path: recordingPath,
        format: "wav",
        onDone: () => {
          this.setState({message: "Finished playback"});
        },
        onCancel: () => {
          this.setState({message: "Playback cancelled"});
        }
      });
    }
    else{
      this.setState({message: "Please record and save the audio first before listening to it"});
    }
  }

  _onDelete = async () => {
    response = await _onDeleteDictation();
    if(response){
      try{
        await this.props.firebase.deleteDictation(this.state.dictationName);
        Alert.alert("Dictation was succesfully deleted.");
      }catch(error){

      }
    }
  }
 
  render() {
    return (
      <View>
        <ScrollView>
          <ImageBackground source={require("../Assets/MedicalBackground.png")} style={styles.container}>
            {!!this.state.message && (
              <Text style={styles.warningText}>
                {this.state.message}
              </Text>
            )}
            {!!this.state.successMessage && (
              <Text style={styles.successText}>
                {this.state.successMessage}
              </Text>
            )}
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Dictation Name"
                placeholderTextColor="#c7f1ff"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => this.setState({ dictationName:text })}/>
            </View>
            <View style={styles.recordButtonsView}>
              <Text style={styles.helperTxt}>Ready to Record</Text>
              <TouchableOpacity onPress={this._onRecord}>
                <Image style={styles.buttons} source={require("../Assets/RecordButtonIdle.png")}/>
              </TouchableOpacity>
              <Text style={styles.helperTxt}>Recording Playback</Text>
            </View>
            <View style={styles.dictationView}>
              <TouchableOpacity onPress={this._onPlayback}>
                <Image style={styles.buttons} source={require("../Assets/PlayButton.png")}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onDelete}>
                <Image style={styles.buttons} source={require("../Assets/DeleteButton.png")}/>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10
  },
  recordButtonsView: {
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 15,
    textAlign: "center"
  },
  dictationView: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 8
  },
  inputView: {
    width: "90%",
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
  helperTxt: {
    marginTop: 4,
    marginBottom: 18,
    color: "#292929",
    fontSize: 16
  },
  warningText: {
    color: "red",
    fontSize: 18,
    padding: 5,
    textAlign: "center"
  },
  successText: {
    color: "green",
    fontSize: 18,
    padding: 5,
    textAlign: "center"
  }
});


export default withFirebaseHOC(Recorder);
