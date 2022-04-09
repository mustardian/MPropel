import { importObject,summonRipple,setupNavAndHamburger,addRipples } from "../common/common.js";
import {makeCalendar} from "../javascript/calendar.js";
import {
    getAuth,
    onAuthStateChanged //I realized this is trump card to keep track of user login session details WITHOUT using sessionstorage
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

import {app,auth} from "../javascript/firebase/auth.js";
import { getFromDB } from "./firebase/db.js";






function makeStudentExamPage(data){

    setupNavAndHamburger(data);


    let footer = document.querySelector(".rollno");
    footer.textContent = data.rno;

    importObject("../html/exams.html","../css/exams.css","replace_with_exams","exam_body");

}


function makeFacultyExamPage(data){

    setupNavAndHamburger(data);

    let footer = document.querySelector(".rollno");
    footer.textContent = data.rno;

    let stat = document.querySelector(".status");
    stat.textContent = "Faculty Login";

    let ftname = document.querySelector(".username");
    ftname.style.color = "#ffBf4f";

    



}

//Very dangerous zone ahead. If you mess this up, then the database will consider you as malpraktise!
onAuthStateChanged(auth,(user) => {//Whenever login session state changes
    if (user){//User has logged in
        let id = user.uid;
        //console.log(id);
        getFromDB("users/"+id).then(data => {
            console.log("Retrieved data successfully!");
            console.log(typeof(data.faculty));
            if (!data.faculty){
                makeStudentExamPage(data["fetchedData"]);
            }
            else{
                makeFacultyExamPage(data["fetchedData"]);
            }
            
        }).catch(data => {
            console.log("Some malpraktise has occurred");
        })
    }
    else{//User has logged out
        console.log("User has logged out!")
        window.location.replace("../html/login.html");
    }
})
 //this should be modified in future