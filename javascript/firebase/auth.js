// importing the firebase module
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

import { addToDB, getFromDB } from "./db.js"; //Custom functions

const firebaseConfig = {
    apiKey: "AIzaSyCIhKV7BfqVA4zLBPmeags9HUP3wyDOAfA",
    authDomain: "v-crypt-336ad.firebaseapp.com",
    projectId: "v-crypt-336ad",
    storageBucket: "v-crypt-336ad.appspot.com",
    messagingSenderId: "121853929909",
    appId: "1:121853929909:web:3196f4e601324f454491fc",
    measurementId: "G-JD4GKSHJ60"
}; //SEKRET MALPRAKTISE which is supposed to be moved to secure environment. These are the configurations used to access our database in firebase server

const app = initializeApp(firebaseConfig);

function logger(message) {
    console.log(message);
}//When you wanna reduce console.log to logger.. coz you are lazy like hell

/*  
The following function is used to check if the user is logged in or not.
If the user is logged in, it returns the user's UID.
If the user is not logged in, it returns the error code.

Error codes:
auth/wrong-password
auth/user-not-found
auth/invalid-email
auth/email-already-in-use
auth/weak-password
auth/too-many-requests
auth/network-request-failed
*/

// Create a new user
async function createUser(email, password, data) { //Async function is used to do stuff in parallel to what is happening already. This is important whenever we deal with data updation/retrieval

    const auth = getAuth(); // {I need to know how this works} {mustardian: no you don't}
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { //.then executes when the async function returns a positive signal
            // Signed in 
            const user = userCredential.user;

            addToDB("users/" + user.uid, {
                name: data.name,
                rno: data.rno,
                classNo: data.classNo,
                email: data.email
            });
            logger(`User ${user.email} signed up`);
        })
        .catch((error) => { //Error handling. .catch() executes when the async function fails to return a positive signal
            const errorCode = error.code;
            const errorMessage = error.message;
            logger(`Error: ${errorCode} ${errorMessage}`);
        });
}

// Login a user
async function loginUser(email, password, rememberMe) {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // Logged in
                const user = userCredential.user;
                logger(`User ${user.uid} logged in`);
                /*
                bring back if needed. but until then uid cannot be fetched from storage

                if (rememberMe) {
                    localStorage.setItem('uid', user.uid); //localStorage is a key-value pair like object which can store data in a local browser indefinitely for later retrievel. Next time user tries to enter login page, we could check if they have the 'Remember me' preference set and log them in directly
                } else {
                    sessionStorage.setItem("uid", user.uid);  // same but like localStorage but only for the current session, does do-es the delets after the session is over.
                }

                */
                // resolves promise
                resolve({
                    uid: user.uid,
                    email: user.email,
                    loggedIn: true
                });
            })
            .catch((error) => {

                // Errors if any
                const errorCode = error.code;
                const errorMessage = error.message;
                logger(`Error: ${errorCode} ${errorMessage}`);

                 /*
                bring back if needed. but until then uid cannot be fetched from storage

                if (rememberMe) {
                    localStorage.setItem('uid', errorCode);
                } else {
                    sessionStorage.setItem("uid", errorCode);
                }

                */

                // rejects promise
                reject({
                    uid: errorCode,
                    email: errorMessage,
                    loggedIn: false
                });
            });
    });
}

// Send password reset email
async function resetPasswordByEmail(email) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            logger(`Password reset email sent to ${email}`);
        })
        .catch((error) => {
            logger(`Error: ${error}`);
        });
}




export { logger, createUser, loginUser ,resetPasswordByEmail};