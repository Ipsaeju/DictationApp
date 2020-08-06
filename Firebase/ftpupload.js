// import { ftpConfig, bucketUri, fileType } from "./ftpconfig";
// import { Alert } from "react-native";

// export const uploadToFilezilla = async (filePath, userEmail, fileName) => {
//     let sftpClient = new Client();

//     fileUri = bucketUri + filePath + fileType;
//     destPath = "./" + userEmail + "/" + fileName + fileType;

//     sftpClient.connect(ftpConfig).then(() => {
//         sftpClient.fastPut(fileUri, destPath);
//     }).then(() => {
//         sftpClient.end();
//         console.log("upload success");
//     }).catch((error) => {
//         console.log(error);
//         Alert.alert("There was an issue uploading the file to FileZilla. Please contact a system admin or try again.");
//     })
// }