import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
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
                    <Text style={styles.companyBold}>md</Text>
                    <Text style={styles.companyFine}>Solutions</Text>
                    <Text style={styles.companyBold}>⁺</Text>
                </View>
                <ActivityIndicator size="large" color="white"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0d73de",
        flex: 1
    },
    companyContainer: {
        flexDirection: "row",
        marginBottom: 22
    },
    companyBold: {
        color: "white",
        fontWeight: "bold",
        fontSize: 46,
        fontFamily: "roboto"
    },
    companyFine: {
        color: "#54eeff",
        fontSize: 46,
        fontFamily: "roboto",
        fontWeight: "300"
    }
});

export default withFirebaseHOC(Preload);