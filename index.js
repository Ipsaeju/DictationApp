import { AppRegistry } from 'react-native';
import { Component } from 'react';
import Login from './Components/login'
import Dashboard from './Components/dashboard'

class DictationApp extends Component{
    state = {
        isLoggedin: false
    }

    render(){
        if(this.state.isLoggedin){
            return <Dashboard onLogoutPress={() => this.setState({isLoggedin: false})}/>;
        }
        else{
            return <Login onLoginPress={() => this.setState({isLoggedin: true})}/>;
        }
    }
}

AppRegistry.registerComponent('startingPoint', () => DictationApp);
