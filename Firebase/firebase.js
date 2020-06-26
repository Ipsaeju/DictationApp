import "@react-native-firebase/auth";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseconfig";
import "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";


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
        return storage().ref();
    },
    uploadToReference: (file, metadata, fileName) => {
        let dictationRef = Firebase.getStorageRef();
        return dictationRef.child(Firebase.getCurrUserId() + "/Dictations/" + fileName)
        .putFile(file, { contentType: "audio/wav", customMetadata: metadata});
    },
    deleteDictation: (fileName) => {
        let dictationRef = Firebase.getStorageRef();
        return dictationRef.child(Firebase.getCurrUserId() + "/Dictations/" + fileName + ".wav").delete();
    },
    getUserDictations: () => {
        let dictationRef = Firebase.getStorageRef();
        return dictationRef.child(Firebase.getCurrUserId() + "/Dictations/").listAll();
    },
    getDictationMetadata: () => {
        let listResult = Firebase.getUserDictations();
        let metadataList = [];
        let dictationList = null;
        
        return listResult.then((result) => {
            dictationList = result.items;
            dictationList.forEach((dictation) => {
                let metadataObj = {
                    dictationName: dictation.name, 
                    fullPath: dictation.fullPath
                }
                metadataList.push(metadataObj);
            });
            return metadataList;
        }).catch(function(error){
            console.log(error);
        });
    }
    

}

export default Firebase;