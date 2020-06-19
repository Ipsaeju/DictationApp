import React from "react";
import { RNVoiceRecorder } from "react-native-voice-recorder";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView} from "react-native";
import Warnings from "./Alerts/warnings";
import { withFirebaseHOC } from '../Firebase';
// import "@react-native-firebase/storage";
import "@react-native-firebase/auth";
import * as firebase from "firebase";
import storage from "@react-native-firebase/storage";
import RNFS from "react-native-fs";

let recordingPath;
class Recorder extends React.Component{
  state = {
    dictationName: "",
    message: "",
    successMessage: ""
  };

  _onRecord = () => {
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
            recorder: firebase.auth().currentUser.email
          };
          try{
            let currUser = firebase.auth().currentUser.uid;
            let storageRef = storage().ref();
            let uploadTask = storageRef.child(currUser + "/" + this.state.dictationName).putFile(file, { contentType: "audio/wav", customMetadata: metadata});
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

  _onDelete = () => {
    if(this._isMounted){
      response = Warnings._onDeleteDictation();
      if(response){
        deleteResp = this.props.firebase.deleteDictation(this.state.audioFile).then(function() {
          this.setState({
            message: "Dictation deleted successfully",
            audioFile: null,
            recordingPath: null
          });
          this._clearTimer();
        }).catch(function(error) {
          if(error.code === "storage/object-not-found"){
            this.setState({message: "Dictation was not found or already deleted. Returning you back to dashboard"});
            this.props.navigation.navigate("Dashboard");
          }
          else if(error.code === "storage/retry-limit-exceeded"){
            this.setState({message: "This delete has taken too long to perform. Please try again another time"});
          }
        })
      }
    }
  }

  _onReturn = () => {
    // if(recordingPath == null){
    //   let response = Warnings._onReturntoDash();
    //   if(response === true){
    //     this.props.navigation.navigate("Dashboard");
    //   }
    // }
    // else{
    //   this.props.navigation.navigate("Dashboard");
    // }
    this.props.navigation.navigate("Dashboard");
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
            <View style={styles.recordButtonsView}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Dictation Name"
                  placeholderTextColor="#c7f1ff"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={text => this.setState({ dictationName:text })}/>
              </View>
              <Text style={styles.helperTxt}>Ready to Record</Text>
              <TouchableOpacity onPress={this._onRecord}>
                <Image style={styles.buttons} source={require("../Assets/RecordButtonIdle.png")}/>
              </TouchableOpacity>
            </View>
            <View style={styles.playbackView}>
              <Text style={styles.helperTxt}>Recording Playback</Text>
              <TouchableOpacity onPress={this._onPlayback}>
                <Image style={styles.buttons} source={require("../Assets/PlayButton.png")}/>
              </TouchableOpacity>
            </View>
            <View style={styles.dictationView}>
              <TouchableOpacity onPress={this._onDelete}>
                <Image style={styles.buttons} source={require("../Assets/DeleteButton.png")}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onReturn}>
                <Image style={styles.buttons} source={require("../Assets/ReturnButton.png")}/>
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
  playbackView: {
    alignContent: "center",
    paddingBottom: 8
  },
  dictationView: {
    alignContent: "space-around",
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
