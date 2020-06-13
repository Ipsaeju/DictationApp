import React from "react";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements"
import ErrorMsgHandler from "./Alerts/errors";

class DictationsList extends React.Component {

    constructor(errorMsgHandler = new ErrorMsgHandler()) {
        this.errMsgHandler = errorMsgHandler;
    }

    state = {
        dictationList: [],
        message: ""
    };


    _getDictations = async () => {
        try{
            response = await this.props.firebase.getUserDictations();
            if(response == null) this.setState({message: "You have no dictations to view or send. Make one!"});
            else return response;
        }catch(error) {
            this.setState({message: this.errMsgHandler.handleStoreErrMsg(error.code)});
        }
    }

    _listDictations = async () => {
        try{
            mdList = this._getDictations();
            if(mdList != null){
                response = await this.props.firebase.getDictationListInfo();
                this.setState({dictationList: response})
            }
        }catch(error) {
            this.setState({message: this.errMsgHandler.handleStoreErrMsg(error.code)});
        }
    }

    _getDictationPath = async (dictation) => {
        return dictation.dictationPath;
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {!!this.state.message && (
                        <Text style={styles.helperText}>
                            {this.state.message}
                        </Text>
                    )}
                    <List>
                        <FlatList data={this.state.dictationList} renderItem={({ item }) => (
                            <ListItem
                                title={`${item.dictationName}`}
                                subtitle={`${item.dictationDuration}`}
                                bottomDivider
                                chevron
                                //onPress={() => this.props.navigation.navigate("Viewer", {path: item.dictationPath})}
                             />
                            )}
                            keyExtractor={item => item.dictationPath}
                        />
                    </List>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
    },
    helperText: {
      marginTop: 20,
      color: "#777777",
      fontSize: 12
    },
    warningText: {
      color: "red",
      fontSize: 12,
      padding: 5
    }
  });

  export default DictationsList;