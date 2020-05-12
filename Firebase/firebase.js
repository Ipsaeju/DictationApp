import "@react-native-firebase/auth";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseconfig";
import "@react-native-firebase/app";
import UUIDGenerator from 'react-native-uuid-generator';

firebase.initializeApp(firebaseConfig);

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
    getCurrUser: () => {
        return firebase.auth().currentUser.email;
    },
    getCurrUserId: () => {
        return firebase.auth().currentUser.uid;
    },
    setDictation: (dName, dUri) => {
        return firebase.firestore().collection("Dictations").doc(`${Firebase.getCurrUserId}`).set({
            dictationName: dName,
            dictationUid: UUIDGenerator.getRandomUUID(),
            dictationUri: dUri,
            recorderName: Firebase.getCurrUser()
        });
    }
}

export default Firebase;