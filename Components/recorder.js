import { RNVoiceRecorder } from "react-native-voice-recorder";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground} from "react-native";
import Warnings from "./Alerts/warnings";
import { withFirebaseHOC } from '../Firebase';


class Recorder extends React.Component{
  state = {
    timer,
    recordSeconds: "00",
    recordMins: "00",
    recordHrs: "00",
    duration: "00:00:00",
    dictationName: "",
    uploadProgress: 0,
    message: "",
    audioFile: null,
    recordingPath: null,
    isRecording: false,
    isDoneRecording: false,
    isPlaying: false
  };

  _startTimer = async () => {
    if(this.state.isRecording){
      this.state.timer = setInterval(() => {
        seconds = (Number(this.state.recordSeconds) + 1).toString();
        minutes = this.state.recordMins;
        hours = this.state.recordHrs;
        if(Number(this.state.recordSeconds) == 59){
          minutes = (Number(this.state.recordMins) + 1).toString();
          seconds = "00";
        }
        else if(Number(this.state.recordMins) == 59 && Number(this.state.recordSeconds) == 59){
          hours = (Number(this.state.recordHrs) + 1).toString();
          minutes = "00";
          seconds = "00";
        }
  
        this.setState({
          recordSeconds: seconds.length == 1 ? "0" + seconds : seconds,
          recordMins: minutes.length == 1 ? "0" + minutes : minutes,
          recordHrs: hours.length == 1 ? "0" + hours : hours
        });
      }, 1000);
    }
    else{
      clearInterval(this.state.timer);
    }
  }

  _clearTimer = async () => {
    this.setState({
      recordHrs: "00",
      recordMins: "00",
      recordSeconds: "00"
    });
  }

  _onRecord = async () => {
    this.setState({isRecording: true});
    this._startTimer();
    
    RNVoiceRecorder.Record({
      format: "wav",
      onDone: (path) => {
        this.setState({
          duration: this.state.recordHrs + this.state.recordMins + this.state.recordSeconds,
          isRecording: false,
          isDoneRecording: true,
          audioFile: path
        });
      },
      onCancel: () => {
        this.setState({
          message: "Cancelled recording",
          isRecording: false,
          isDoneRecording: false,
          audioFile: null
        });
        this._clearTimer();
      }
    })
  }

  _onSave = async () => {
    metadata = {
      name: this.state.dictationName,
      recorder: this.props.firebase.getCurrUserEmail(),
      duration: this.state.duration,
      contentType: "audio/wav"
    };
    uploadTask = this.props.firebase.uploadToReference(this.state.audioFile, metadata);
    uploadTask.on("state_changed", function(snapshot){
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({uploadProgress: progress});
    },
    function(error) {
      if(error.code === "storage/retry-limit-exceeded"){
        this.setState({message: "This save has taken too long to perform. Please try again"});
      }
      this.setState({message: "There was an error in saving the audio. Please try again or contact an admin"});
      console.log(error);
    }),
    function() {
      this.setState({
        message: "Upload success",
        recordingPath: this.props.firebase.getAudioReference(this.state.audioFile),
        isRecording: false,
        isDoneRecording: false
      });
    }
  }

  _onPlayback = async () => {
    if(this.state.isDoneRecording && this.state.recordingPath != null){
      this._clearTimer();
      this._startTimer();
      this.setState({isPlaying: true});
      RNVoiceRecorder.Play({
        path: this.state.recordingPath,
        format: "wav",
        onDone: () => {
          this.setState({
            message: "Finished playback",
            isPlaying: false
          });
          this._clearTimer();
        },
        onCancel: () => {
          this.setState({
            message: "Playback cancelled",
            isPlaying: false
          });
          this._clearTimer();
        }
      })
    }
    else{
      this.setState({message: "Please record and save the audio first before listening to it"});
    }
  }

  _onDelete = async () => {
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

  _onReturn = async () => {
    if(this.state.isRecording || this.state.recordingPath == null){
      response = Warnings._onReturntoDash();
      if(response){
        this.props.navigation.navigate("Dashboard");
      }
    }
    else{
      this.props.navigation.navigate("Dashboard");
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../Assets/MedicalBackground.png")}>
          {!!this.state.message && (
            <Text style={styles.warningText}>
              {this.state.message}
            </Text>
          )}
          <View style={styles.timerView}>
            <Text style={styles.timerText}>{this.state.recordHrs + " : "}</Text>
            <Text style={styles.timerText}>{this.state.recordMins + " : "}</Text>
            <Text style={styles.timerText}>{this.state.recordSeconds}</Text>
          </View>
          <View style={styles.recordButtonsView}>
            {!this.state.isRecording ? (
              <>
                <Text style={styles.helperTxt}>Ready to Record</Text>
                <TouchableOpacity onPress={this._onRecord}>
                  <Image style={styles.buttons} source={require("../Assets/RecordButtonIdle.png")}/>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.helperTxt}>Recording</Text>
                <TouchableOpacity onPress={this._onRecord}>
                  <Image style={styles.buttons} source={require("../Assets/RecordButtonRecording.png")}/>
                </TouchableOpacity>
              </>
            )}
            {(this.state.isDoneRecording && !this.state.isRecording) && (
              <>
                <Text style={styles.helperTxt}>Press again to redo recording/cancel</Text>
                <TouchableOpacity onPress={this._onRecord}>
                  <Image style={styles.buttons} source={require("../Assets/RecordButtonCancel.png")}/>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.playbackView}>
            <Text style={styles.helperTxt}>Recording Playback</Text>
            {!this.state.isPlaying ? (
              <TouchableOpacity onPress={this._onPlayback}>
                <Image style={styles.buttons} source={require("../Assets/PlayButton.png")}/>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this._onPlayback}>
                <Image style={styles.buttons} source={require("../Assets/StopButton.png")}/>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.dictationView}>
            <TouchableOpacity onPress={this._onSave}>
              <Image style={styles.buttons} source={require("../Assets/SaveButton.png")}/>
            </TouchableOpacity>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Dictation Name"
                placeholderTextColor="#c7f1ff"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => this.setState({ dictationName:text })}
              />
            </View>
            <TouchableOpacity onPress={this._onDelete}>
              <Image style={styles.buttons} source={require("../Assets/DeleteButton.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onReturn}>
              <Image style={styles.buttons} source={require("../Assets/ReturnButton.png")}/>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
  timerView: {
    alignContent: "center",
    paddingTop: 5,
    paddingBottom: 15
  },
  recordButtonsView: {
    alignContent: "center",
    paddingBottom: 15
  },
  playbackView: {
    alignContent: "center",
    paddingBottom: 8
  },
  dictationView: {
    alignContent: "space-around",
    alignItems: "center",
    paddingBottom: 8
  },
  inputView: {
    width: "80%",
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
    fontSize: 20,
    padding: 5
  },
  timerText: {
    color: "#292929",
    fontSize: 36
  }
});


export default withFirebaseHOC(Recorder);
