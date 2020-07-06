
export function _handleStoreErr(error){

    const storeErrList = {
        "storage/unknown": "An unknown error occurred. Please try again or contact a system admin if error persists.", 
        "storage/object-not-found": "The dictation was not found or it has already been deleted.", 
        "storage/quota-exceeded": "Please contact a system admin to let them know the free tier has exceeded size limit.", 
        "storage/unauthenticated": "Please login and try again.", 
        "storage/retry-limit-exceeded": "This save has taken too long to perform. Please try again",
    };

    if(storeErrList.hasOwnProperty(error)) return storeErrList[error];
    else return "An unknown error has occurred. Please try again or contact a system admin.";
}

export function _handleAuthErr(error){
    const authErrList = {
        "auth/invalid-email": "Incorrect email provided.", 
        "auth/email-already-in-use": "An account has already been made with this email. Please login or reset your password.", 
        "auth/user-not-found": "No account has been found with the credentials provided. Please create an account or try again.",             
        "auth/expired-action-code": "The reset code has expired. Please request for a reset again.", 
        "auth/invalid-action-code": "The reset code is invalid. Please request for a reset again.", 
        "auth/wrong-password": "The password provided does not match the records of this account.",
        "auth/email-already-exists": "An account has already been made with this email. Please login or reset your password.",
        "auth/invalid-password": "A password must contain at least 6 alphanumeric or special characters"
    };

    if(authErrList.hasOwnProperty(error)) return authErrList[error];
    else return "An unknown error has occurred. Please try again or contact a system admin.";
}