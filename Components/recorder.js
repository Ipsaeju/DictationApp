import { RNVoiceRecorder } from "react-native-voice-recorder";
import Firebase from "../Firebase"

class Recorder extends React.Component{
  state = {
    recordSeconds: "00",
    recordMins: "00",
    recordHrs: "00",
    duration: "00:00:00",
    dictationName: "",
    uploadProgress: 0,
    message: "",
    recordingPath
  };

  _startTimer = async () => {
    timer = setInterval(() => {
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

  _clearTimer = async () => {
    this.setState({
      recordHrs: "00",
      recordMins: "00",
      recordSeconds: "00"
    });
  }

  _onRecord = async () => {

    this._startTimer();

    RNVoiceRecorder.Record({
      format: 'mp3',
      onDone: (path) => {
        this.setState({duration: this.state.recordHrs + this.state.recordMins + this.state.recordSeconds});
        audioFile = path;
        metadata = {
          name: this.state.dictationName,
          recorder: Firebase.getCurrUserEmail(),
          duration: this.state.duration,
          contentType: "audio/mp3"
        };
        uploadTask = Firebase.uploadToReference(audioFile, metadata);
        uploadTask.on("state_changed", function(snapshot){
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({uploadProgress: progress});
        },
        function(error) {
          this.setState({message: "There was an error in saving the audio. Please try again or contact an admin"});
          console.log(error);
        }),
        function() {
          this.setState({
            message: "Upload success",
            recordingPath: Firebase.getAudioReference(audioFile)
          });
          this._clearTimer();
        }
      },
      onCancel: () => {
        this.setState({
          message: "Cancelled recording"
        });
        this._clearTimer();
      }
    })
  }

  _onPlayback = async () => {
    this._startTimer();

    RNVoiceRecorder.Play({
      path: this.state.recordingPath,
      format: "mp3",
      onDone: () => {
        this.setState({
          message: "Finished playback"
        });
        this._clearTimer();
      },
      onCancel: () => {
        this.setState({
          message: "Playback cancelled"
        });
        this._clearTimer();
      }
    })
  }
 
  render(){
    return{
      
    }
  }
}
export default Recorder;
