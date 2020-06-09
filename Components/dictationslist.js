import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements"

class DictationsList extends React.Component {

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
    
        }
    }

    _getDictationName = async (dictation) => {
        return dictation.dictationName;
    }

    _getDictationDuration = async (dictation) => {
        return dictation.dictationDuration;
    }

    _getDictationPath = async (dictation) => {
        return dictation.dictationPath;
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <List>
                        <FlatList data={this.state.dictationList} renderItem={({ item }) => (
                            <ListItem
                                title={`${item.dictationName}`}
                                subtitle={`${item.dictationDuration}`}
                                bottomDivider
                                chevron
                                onPress={() => this.props.navigation.navigate("Viewer", {path: item.dictationPath})}
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