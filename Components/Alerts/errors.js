
class ErrorMsgHandler {
    storeErrList = {
        "storage/unknown": "An unknown error occurred. Please try again or contact a system admin if error persists.", 
        "storage/object-not-found": "", 
        "storage/quota-exceeded": "Please contact a system admin to let them know the free tier has exceeded size limit.", 
        "storage/unauthenticated": "Please login and try again.", 
        "storage/retry-limit-exceeded": "This save has taken too long to perform. Please try again",
    };
    
    authErrList = {
        "auth/invalid-email": "Incorrect email provided.", 
        "auth/email-already-in-use": "An account has already been made with this email. Please login or reset your password.", 
        "auth/user-not-found": "No account has been found with the credentials provided. Please register or try again.",             
        "auth/expired-action-code": "The reset code has expired. Please request for a reset again.", 
        "auth/invalid-action-code": "The reset code is invalid. Please request for a reset again.", 
        "auth/wrong-password": "The password provided does not match the records of this account."
    };

    handleAuthErrMsg(error){
        for(err in this.authErrList){
            if(err === error){
                return this.authErrList[err];
            }
        }
    }

    handleStoreErrMsg(error){
        for(err in this.storeErrList){
            if(err === error){
                return this.storeErrList[err];
            }
        }
    }
}

export default ErrorMsgHandler;
