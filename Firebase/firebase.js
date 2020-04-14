import "@react-native-firebase/auth";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseconfig";
import "@react-native-firebase/app";

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
    checkUserAuth: user => {
        return firebase.auth().onAuthStateChanged(user);
    }
}

export default Firebase;