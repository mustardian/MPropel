// importing the firebase module
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

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

// Create a new user
async function createUser(email, password, data) { //Async function is used to do stuff in parallel to what is happening already. This is important whenever we deal with data updation/retrieval

    const auth = getAuth(); // {I need to know how this works}
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { //.then executes when the async function returns a positive signal
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
    .catch((error) => { //Error handling. .catch() executes when the async function fails to return a positive signal
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
            localStorage.setItem('uid', user.uid); //localStorage is a key-value pair like object which can store data in a local browser indefinitely for later retrievel. Next time user tries to enter login page, we could check if they have the 'Remember me' preference set and log them in directly
            
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