// importing the firebase module
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    child,
    get,
    update,
    remove,
    onValue
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";


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




async function addToDB(location, data) {
    const db = getDatabase();
    set(ref(db, location),data);
}

async function getFromDB(location) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, location)).then((snapshot) => {
    if (snapshot.exists()) {
        sessionStorage.setItem("uid_data",JSON.stringify(snapshot.val()));
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
    
    
}

export { addToDB, getFromDB };