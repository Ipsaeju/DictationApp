import React, { Component } from 'React';
import { AppLoading } from 'Expo';
import { Asset } from 'Expo-Asset';
import { withFirebaseHOC } from '../Firebase/firebase';

class Preload extends Component {
    state = {
        isLoadingComplete: false
    };

    componentDidMount = async () => {
        try{
            await this.props.firebase.checkUserAuth(user => {
                if(user) this.props.navigation.navigate('Dashboard');
                else this.props.navigation.navigate('Login');
            });
        }catch(error){
            console.log(error);
        }
    }
    
    loadGfx = async () => {
        return await Promise.all([
            Asset.loadAsync([
             require('../Assets/punchy.png')
            ])
        ]);
    }

    loadErrorLogger = error => {
        console.log(error);
    }

    loadCompleteFlag = () => {
        this.setState({ isLoadingComplete: true });
    }

    render(){
        return(
            <AppLoading
                startAsync={this.loadGfx}
                onFinish={this.loadCompleteFlag}
                onError={this.loadErrorLogger}
            />
        );
    }
}

export default withFirebaseHOC(Preload);