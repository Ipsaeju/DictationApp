import React from "react";
import { StyleSheet, View } from "react-native";
import { withFirebaseHOC } from '../Firebase';

class Dashboard extends React.Component {

  state = {
    user: this.props.firebase.getCurrUserEmail()
  };
 
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  }
});

export default withFirebaseHOC(Dashboard);
