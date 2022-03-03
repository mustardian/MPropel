// importing the firebase module
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

import { addToDB, getFromDB } from "./db.js";

const firebaseConfig = {
    apiKey: "AIzaSyCIhKV7BfqVA4zLBPmeags9HUP3wyDOAfA",
    authDomain: "v-crypt-336ad.firebaseapp.com",
    projectId: "v-crypt-336ad",
    storageBucket: "v-crypt-336ad.appspot.com",
    messagingSenderId: "121853929909",
    appId: "1:121853929909:web:3196f4e601324f454491fc",
    measurementId: "G-JD4GKSHJ60"
  };
const app = initializeApp(firebaseConfig);

function logger(message) {
    console.log(message);
}

// Create a new user
async function createUser(email, password, data) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        addToDB("users/"+user.uid, {
            name: data.name,
            rno: data.rno,
            classNo: data.classNo,
            email: data.email
        });
        logger(`User ${user.email} signed up`);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logger(`Error: ${errorCode} ${errorMessage}`);
    });
}

// Login a user
async function loginUser(email, password, rememberMe) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Logged in
        const user = userCredential.user;
        logger(`User ${user.uid} logged in`);
        if (rememberMe) {
            localStorage.setItem('uid', user.uid);
        }else{
            sessionStorage.setItem("uid", user.uid);

        }
    })
    .catch((error) => {
        // Errors if any
        const errorCode = error.code;
        const errorMessage = error.message;
        logger(`Error: ${errorCode} ${errorMessage}`);
    });
}




export { logger, createUser, loginUser };