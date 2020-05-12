import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import AudioRecorderPlayer from "react-native-audio-recorder-player";

class Dictation extends React.Component {

    recorder = new AudioRecorderPlayer();

    state = {
        recordSeconds: 0.0,
        recordTime: "00:00:00",
        name: "",
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: "00:00:00",
        duration: "00:00:00",
    };

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

    

}