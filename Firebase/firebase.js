import "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";

const Firebase = {
    login: (email, password) => {
        return auth().signInWithEmailAndPassword(email, password);
    },
    register: (email, password) => {
        return auth().createUserWithEmailAndPassword(email, password);
    },
    logout: () => {
        return auth().signOut();
    },
    resetPass: (email) => {
        return auth().sendPasswordResetEmail(email);
    },
    checkUserAuth: (user) => {
        return auth().onAuthStateChanged(user);
    },
    getCurrUserEmail: () => {
        return auth().currentUser.email;
    },
    getCurrUserId: () => {
        return auth().currentUser.uid;
    },
    getStorageRef: () => {
        return storage().ref();
    },
    uploadToReference: (file, metadata, fileName) => {
        let dictationRef = Firebase.getStorageRef();
        return dictationRef.child(Firebase.getCurrUserEmail() + "/Dictations/" + fileName)
        .putFile(file, { contentType: "audio/wav", customMetadata: metadata});
    },
    deleteDictation: (fileName) => {
        let dictationRef = Firebase.getStorageRef();
        return dictationRef.child(Firebase.getCurrUserEmail() + "/Dictations/" + fileName).delete();
    },
    getUserDictations: () => {
        let dictationRef = Firebase.getStorageRef();
        return dictationRef.child(Firebase.getCurrUserEmail() + "/Dictations/").listAll();
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