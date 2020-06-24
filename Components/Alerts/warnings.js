import { Alert } from "react-native";

const Warnings = {

    _onDeleteDictation: () => {
        let resp = false;
        Alert.alert("Warning", 
        "Are you sure you want to delete this dictation? This action cannot be undone.",
        [
            {text: "Yes", onPress: () => resp = true},
            {text: "Cancel", style: "cancel"}
        ],
        {cancelable: false});
        return resp;
    },
    _onReturntoDash: () => {
        let resp = false;
        Alert.alert("Warning",
        "Are you sure you want to return to dashboard without saving? Your dictation will be gone unless you save.",
        [
            {text: "Yes", onPress: () => resp = true},
            {text: "Cancel", style: "cancel"}
        ],
        {cancelable: false});
        return resp;
    },
    _onSuccessfulReset: () => {
        Alert.alert("Success",
        "Password reset email has been sent. Please check your email as soon as possible to reset your password.");
    }   

}

export default Warnings;