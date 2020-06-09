import "@react-native-firebase/auth";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseconfig";
import "@react-native-firebase/app";
import UUIDGenerator from 'react-native-uuid-generator';
import "@react-native-firebase/storage"

firebase.initializeApp(firebaseConfig);

const Firebase = {
    dUid,
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
    createDictationUid: () => {
        dUid = UUIDGenerator.getRandomUUID();
        return firebase.storage().ref().child(`${Firebase.getCurrUserId}` + "/" + dUid + "_");
    },
    uploadToReference: (file, metadata) => {
        dictationRef = Firebase.createDictationUid();
        return dictationRef.put(file, metadata);
    },
    getAudioReference: (file) => {
        return firebase.storage().ref(`${Firebase.getCurrUserId}` + "/" + dUid + "_" + file).fullPath;
    },
    deleteDictation: (file) => {
        return firebase.storage().ref(`${Firebase.getCurrUserId}` + "/" + dUid + "_" + file).delete();
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