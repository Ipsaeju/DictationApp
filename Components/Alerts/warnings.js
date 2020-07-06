import { Alert } from "react-native";

export function _onDeleteDictation(){
    return new Promise((resolve, reject) => {
        Alert.alert("Warning",
        "Are you sure you want to delete this dictation? This action cannot be undone.",
        [
            {text: "Yes", onPress: () => resolve(true)},
            {text: "Cancel", onPress: () => resolve(false)}
        ],
        {cancelable: false});
    })
}

export function _onSuccessfulReset(){
    return new Promise((resolve, reject) => {
        Alert.alert("Success",
        "Password reset email has been sent. Please check your email as soon as possible to reset your password.",
        [
            {text: "OK", onPress: () => resolve(true)}
        ],
        {cancelable: false});
    })
}  
