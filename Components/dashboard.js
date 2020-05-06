import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { withFirebaseHOC } from '../Firebase';

class Dashboard extends React.Component {

  _userLogout = async () => {
    try{
      await this.props.firebase.logout();
    }catch(error) {
      console.log(error);
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.helperText}>You made it here</Text>
        <TouchableOpacity style={styles.btn} onPress={this._userLogout}>
          <Text style={styles.btnText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  helperText: {
    marginTop: 20,
    color: "white",
    fontSize: 12
  },
  warningText: {
    color: "red",
    fontSize: 12,
    padding: 5
  },
  btn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  btnText: {
    color: "white"
  }
});

export default withFirebaseHOC(Dashboard);
