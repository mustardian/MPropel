import { loginUser } from "./firebase/auth.js";
import { getFromDB } from "./firebase/db.js";

const loginb = document.querySelector(".submit_button");
loginb.addEventListener("click",handleLogin);

/*
Error codes:
auth/wrong-password
auth/user-not-found
auth/invalid-email
auth/email-already-in-use
auth/weak-password
auth/too-many-requests
auth/network-request-failed
*/

function handleLogin(event){

    let name = document.querySelector(".username-input").value;
    let pass = document.querySelector(".password-input").value;

    if (!name && !pass){
        displayError("Take a deep breath, and fill in something...")
    }
    else{
        loginUser(name,pass)
        .then(data =>{
            let id = data.uid;

            //Login code goes here

            let userdata = getFromDB("users/"+id);

            if (userdata){
                window.location.replace("../html/home.html");
            }
            else{
                console.log("Some malpraktise you are!")
            }
        })
        .catch(data => {
            console.log(data);
            let errormsg = "An error has occured. Please try again!";
            let errorcode = data.code;

            switch (errorcode){
                case ("auth/wrong-password"):
                    displayError("Your username or password is incorrect!")
                    break;
                case ("auth/user-not-found"):
                    displayError("The user does not exist!")
                    break;
                case ("auth/invalid-email"):
                    displayError("Your email is not valid!")
                    break;
                case ("auth/network-request-failed"):
                    displayError("The server failed to respond. Please try again!")
                    break;
                case ("auth/too-many-requests"):
                    displayError("Too many attempts to login. Please try again later")
                    break;
                default:
                    displayError("An unknown error has occured")
            }
            

        })
    }
}

function displayError(errormsg){
    let display = document.querySelector(".error-message");
    display.textContent = errormsg;
}