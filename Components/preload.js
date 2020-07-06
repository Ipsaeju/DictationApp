import React from "react";
import { View, StyleSheet, ActivityIndicator, Text, Image } from "react-native";
import { withFirebaseHOC } from "../Firebase";

class Preload extends React.Component {
    state = {
        isLoadingComplete: false
    };

    componentDidMount = async () => {
        try{
            await this.props.firebase.checkUserAuth(user => {
                this.props.navigation.navigate(user ? "Dashboard" : "Login");
            });
        }catch(error){
            console.log(error);
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.companyContainer}>
                    <Image source={require("../Assets/MDSolutionsLogo.png")} resizeMethod="resize" resizeMode="contain"/>
                </View>
                <ActivityIndicator size="large" color="blue"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flex: 1
    },
    companyContainer: {
        marginBottom: 22
    }
});

export default withFirebaseHOC(Preload);