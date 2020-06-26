import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, FlatList, ScrollView } from "react-native";
import { withFirebaseHOC } from '../Firebase';
import ErrorMsgHandler from "./Alerts/errors";
import { ListItem } from "react-native-elements";

class Dashboard extends React.Component {

  state = {
    user: this.props.firebase.getCurrUserEmail(),
    message: "",
    dictationList: []
  };
  
  componentDidMount = () => {
    this._getDictations();
  }

  _userLogout = async () => {
    try{
      this.props.firebase.logout();
    }catch(error) {
      // this.setState({message: this.errorMsgHandler.handleAuthErrMsg(error.code)});
      console.log(error);
    }
  }

  _getDictations = async () => {
    try{
        let response = await this.props.firebase.getDictationMetadata();
        if(response == null) this.setState({message: "You have no dictations to view or send. Make one!"});
        else{
          this.setState({dictationList: response});
          console.log(this.state.dictationList);
        }
    }catch(error) {
        // this.setState({message: this.errMsgHandler.handleStoreErrMsg(error.code)});
        console.log(error);
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item }) => (
    <ListItem
      title={item.dictationName}
      bottomDivider
      chevron
      onPress={() => this.props.navigation.navigate("Viewer", { dictationName: item.dictationName, dictationPath: item.fullPath })}
    />
    );
    
  render() {
    return (
      <View style={styles.listContainer}>
        <FlatList data={this.state.dictationList} extraData={this.state} renderItem={this._renderItem} keyExtractor={this._keyExtractor}/>
        <ScrollView>
          <View style={styles.container}>
            {!!this.state.message && (
              <Text style={styles.helperText}>
                {this.state.message}
              </Text>
            )}
            <TouchableOpacity style={styles.btn} onPress={this._userLogout}>
              <Text style={styles.btnText}>LOGOUT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate("Recorder")}>
              <Text style={styles.btnText}>Make Dictation</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "stretch"
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  helperText: {
    marginTop: 20,
    color: "#777777",
    fontSize: 12
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
