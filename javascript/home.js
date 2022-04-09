import { importObject,summonRipple, removeObject,addRipples,setupNavAndHamburger } from "../common/common.js";
import {makeCalendar} from "../javascript/calendar.js";
import {
    getAuth,
    onAuthStateChanged //I realized this is trump card to keep track of user login session details WITHOUT using sessionstorage
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

import {app,auth} from "../javascript/firebase/auth.js";
import { getFromDB } from "./firebase/db.js";




/*window.addEventListener("beforeunload", (event)=> {
    auth.signOut();
})*/


function updateInprogress(examName, timeLeft){
    //Time left will be given in pure seconds, or this is yet to be decided

    importObject("../html/inprogress.html","../css/inprogress.css","replace_with_inprogress").then(function(){
        let en = document.querySelector(".test-name");
        let tl = document.querySelector(".time-left");
    
        if (en && tl){
            en.textContent = examName;
            tl.textContent = timeLeft;
        }
        else{
            console.log("Inprogress object failed to load!")
        }
    }
    )
}



function makeStudentHomePage(data){

    setupNavAndHamburger(data);

    importObject("../common/calendar.html","../css/calendar.css","replace_with_calendar","exam-widget-grid").then((elem) =>{makeCalendar(data.classNo[0],elem); addRipples(elem.getElementsByTagName("button")) })

    importObject("../html/announcements.html","../css/announcements.css","replace_with_announcements","announcements-widget")

    importObject("../html/potd.html","../css/potd.css","replace_with_potd","potd-widget-grid").then((elem) =>{addRipples(elem.getElementsByTagName("button")) })

    //In future make the footer html can also be considered to be imported but I am going with this for now

    let footer = document.querySelector(".rollno");
    footer.textContent = data.rno;

    removeObject(document.querySelector(".loading"),document.querySelector(".load-css"));

}


function makeFacultyHomePage(data){

    setupNavAndHamburger(data);

    //These imports needs to be modified later for faculty version
    importObject("../common/calendar.html","../css/calendar.css","replace_with_calendar","exam-widget-grid").then((elem) =>{makeCalendar(data.classNo[0],elem); addRipples(elem.getElementsByTagName("button")) })

    importObject("../html/announcements.html","../css/announcements.css","replace_with_announcements","announcements-widget")

    importObject("../html/potd.html","../css/potd.css","replace_with_potd","potd-widget-grid").then((elem) =>{addRipples(elem.getElementsByTagName("button")) })

    //In future make the footer html can also be considered to be imported but I am going with this for now

    let footer = document.querySelector(".rollno");
    footer.textContent = data.rno;

    let stat = document.querySelector(".status");
    stat.textContent = "Faculty Login";

    let ftname = document.querySelector(".username");
    ftname.style.color = "#ffBf4f";

    removeObject(document.querySelector(".loading"),document.querySelector(".load-css"));
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
                makeStudentHomePage(data["fetchedData"]);
            }
            else{
                makeFacultyHomePage(data["fetchedData"]);
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


//updateInprogress("MAT", "You are screwed lol!") //only use this when you need to display alert over a running exam.