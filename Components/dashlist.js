import React from "react";
import { Text, StyleSheet, View, FlatList} from "react-native";
import { withFirebaseHOC } from '../Firebase';
import { _handleStoreErr } from "./Alerts/errors";
import { ListItem } from "react-native-elements";


class DashList extends React.Component {

  state = {
    user: this.props.firebase.getCurrUserEmail(),
    message: "",
    dictationList: [],
    emptyMessage: ""
  };
  
  componentDidMount = () => {
    this._getDictations();
  }

  componentDidUpdate = () => {
    setTimeout(() => this.setState({message: ""}), 4000);
  }

  _getDictations = async () => {
    try{
        let response = await this.props.firebase.getDictationMetadata();
        if(response == null) this.setState({emptyMessage: "You have no dictations to view or send. Make one!"});
        else{
          this.setState({dictationList: response});
        }
    }catch(error) {
        this.setState({message: _handleStoreErr(error.code)});
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item }) => (
    <ListItem
      title={item.dictationName}
      bottomDivider
      chevron
      onPress={() => this.props.navigation.navigate("Viewer", { dictationName: item.dictationName, dictationPath: item.fullPath })}/>
    );
    
  render() {
    return (
      <View style={styles.listContainer}>
        {!!this.state.emptyMessage && (
          <Text style={styles.emptyText}>
            {this.state.emptyMessage}
          </Text>
        )}
        <FlatList data={this.state.dictationList} extraData={this.state} renderItem={this._renderItem} keyExtractor={this._keyExtractor}/>
        <View style={styles.container}>
            {!!this.state.message && (
              <Text style={styles.warningText}>
                {this.state.message}
              </Text>
            )}
          </View>
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
  warningText: {
    color: "white",
    fontSize: 18,
    padding: 5,
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 15
  },
  emptyText: {
    marginTop: 20,
    color: "#777777",
    fontSize: 12
  }
});

export default withFirebaseHOC(DashList);
