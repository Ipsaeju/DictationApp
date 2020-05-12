import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import Recorder from "./recorder"

class Dictation extends React.Component {

    state = {
        dictationName: "",
        dictationUri: "",
        message: ""
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
}