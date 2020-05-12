import AudioRecorderPlayer from 'react-native-audio-recorder-player';

class Recorder extends React.Component{
    recorder = new AudioRecorderPlayer();

    constructor(props){
        super(props);

        this.state = {
            recordSeconds: 0.0,
            recordTime: "00:00:00",
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: "00:00:00",
            duration: "00:00:00",
        };
    }

    _onStartRecorder = async () => {
        const result = await this.recorder.startRecorder();
        this.recorder.addRecordBackListener((e) => {
            this.setState({
                recordSeconds: e.current_position,
                recordTime: this.recorder.mmssss(Math.floor(e.current_position))
            });
        });
        console.log(result);
    }

    _onStopRecord = async () => {
        const result = await this.recorder.stopRecorder();
        this.recorder.removeRecordBackListener();
        this.setState({
          recordSeconds: 0
        });
        console.log(result);
    }

    _onStartPlay = async () => {
        console.log('onStartPlay');
        const msg = await this.recorder.startPlayer();
        console.log(msg);
        this.recorder.addPlayBackListener((e) => {
          if (e.current_position === e.duration) {
            console.log('finished');
            this.recorder.stopPlayer();
          }
          this.setState({
            currentPositionSec: e.current_position,
            currentDurationSec: e.duration,
            playTime: this.recorder.mmssss(Math.floor(e.current_position)),
            duration: this.recorder.mmssss(Math.floor(e.duration)),
          });
          return;
        });
    }
      
    _onPausePlay = async () => {
    await this.recorder.pausePlayer();
    }
    
    _onStopPlay = async () => {
    console.log('onStopPlay');
    this.recorder.stopPlayer();
    this.recorder.removePlayBackListener();
    }
    
}

export default Recorder;
