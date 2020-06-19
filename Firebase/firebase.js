import "@react-native-firebase/auth";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseconfig";
import "@react-native-firebase/app";
import UUIDGenerator from 'react-native-uuid-generator';
import "@react-native-firebase/storage";


firebase.initializeApp(firebaseConfig);
dUid = "";
const Firebase = {
    login: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    register: (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    },
    logout: () => {
        return firebase.auth().signOut();
    },
    resetPass: (email) => {
        return firebase.auth().sendPasswordResetEmail(email);
    },
    newUserAdd: (userInfo) => {
        return firebase.firestore().collection("Users").doc(`${userInfo.uid}`).set(userInfo);
    },
    checkUserAuth: (user) => {
        return firebase.auth().onAuthStateChanged(user);
    },
    getCurrUserEmail: () => {
        return firebase.auth().currentUser.email;
    },
    getCurrUserId: () => {
        return firebase.auth().currentUser.uid;
    },
    getStorageRef: () => {
        return firebase.storage().ref().child(`${Firebase.getCurrUserId}` + "/");
    },
    uploadToReference: (file, metadata) => {
        let dictationRef = Firebase.getStorageRef();
        return dictationRef.putString(convertToBlob(file), metadata);
    },
    getAudioReference: (file) => {
        return firebase.storage().ref(`${Firebase.getCurrUserId}` + "/" + file).fullPath;
    },
    deleteDictation: (file) => {
        return firebase.storage().ref(`${Firebase.getCurrUserId}` + "/" + file).delete();
    },
    getUserDictations: () => {
        return firebase.storage().ref().child(`${Firebase.getCurrUserId}` + "/").listAll();
    },
    getDictationInfo: (fileRef) => {
        dictationName = "";
        dictationDuration = "";
        dictationPath = fileRef.fullPath;
        fileRef.getMetadata().then(function(metadata) {
            fileName = metadata.name;
            fileDuration = metadata.duration;
        }).catch(function(error) {
            return error;
        });
        return {
            dictationName,
            dictationDuration,
            dictationPath
        };
    },
    getDictationListInfo: (list) => {
        dictationsMetadata = [];
        for (dictation of list) {
            dictationMetadata = Firebase.getDictationInfo(dictation);
            dictationsMetadata.push();
        }
        return dictationsMetadata;
    }
    

}

export default Firebase;