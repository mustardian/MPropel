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


// sets data to the location specified
async function addToDB(location, data) {
    const db = getDatabase();
    set(ref(db, location), data);
}

// gets data from the location specified
async function getFromDB(location) { //pass in path as in user/${uid}
    return new Promise((resolve, reject) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, location)).then((snapshot) => {
            if (snapshot.exists()) {
                sessionStorage.setItem("fetchedData", JSON.stringify(snapshot.val())); // sets fetched data to session storage
                resolve({fetchedData: snapshot.val()}); // resolves the promise with the fetched data
            } else {
                sessionStorage.setItem("fetchedData", "No data available"); // sets No data available to session storage
                resolve({fetchedData: "No data available"}); // resolves the promise with No data available
            }
        }).catch((error) => {
            console.error(error);
            sessionStorage.setItem("fetchedData", error); // sets error to session storage
            reject(error); // rejects the promise with the error
        });
    });
}

export { addToDB, getFromDB };