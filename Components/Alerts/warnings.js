import { Alert } from "react-native";

const Warnings = {

    _onDeleteDictation: () => {
        resp;
        Alert.alert("Warning", 
        "Are you sure you want to delete this dictation? This action cannot be undone.",
        [
            {text: "Yes", onPress: () => resp = true},
            {text: "Cancel", onPress: () => resp = false, style: "cancel"}
        ],
        {cancelable: false});
        return resp;
    },
    _onReturntoDash: () => {
        resp;
        Alert.alert("Warning",
        "Are you sure you want to return to dashboard without saving? Your dictation will be gone unless you save.",
        [
            {text: "Yes", onPress: () => resp = true},
            {text: "Cancel", onPress: () => resp = false, style: "cancel"}
        ],
        {cancelable: false});
        return resp;
    }   

}

export default Warnings;