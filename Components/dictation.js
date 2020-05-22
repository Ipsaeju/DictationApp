import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import recorder from "./recorder"

class Dictation extends React.Component {

    state = {
        dictationName: "",
        dictationUri: "",
        message: "",
        recordSeconds: recorder.state.recordSeconds,
        recordTime: recorder.state.recordTime,
        currentPositionSec: recorder.state.currentPositionSec,
        currentDurationSec: recorder.state.currentDurationSec,
        playTime: recorder.state.playTime,
        duration: recorder.state.playTime,
    };

    _onSave = async () => {
        this.setState({message: ""});

        var params = {
            dictationName: this.state.dictationName,
            dictationUri: this.state.dictationUri
        };

        try{
            await this.props.firebase.setDictation(params.dictationName, params.dictationUri);
            this.props.navigation.navigate("Dashboard");

        }catch(error){
            console.log(error);
        }
    }
    
    _onStartRecording = () => recorder._onStartRecorder();
    _onStopRecording = () => recorder._onStopRecorder();
    _onPlayPlayback = () => recorder._onStartPlay();
    _onPausePlayback = () => recorder._onPausePlay();
    _onStopPlayback = () => recorder._onStopPlay();



    


}