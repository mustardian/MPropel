import { importObject,summonRipple } from "../common/common.js";
import {makeCalendar} from "../javascript/calendar.js";
import {
    getAuth,
    onAuthStateChanged //I realized this is trump card to keep track of user login session details WITHOUT using sessionstorage
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

import {app,auth} from "../javascript/firebase/auth.js";
import { getFromDB } from "./firebase/db.js";






function makeStudentExamPage(data){
    importObject("../common/nav.html","../css/nav.css","replace_with_nav").then((elem) =>{
        addRipples(elem.getElementsByTagName("button")) 

        let menub = elem.querySelector(".topnav-hamburger-menu");
        menub.addEventListener("click", (event) => {
            console.log("Hamburher menu commenced!")
            let surf = document.querySelector(".menu-surface");
            let menu = document.querySelector(".hamburger-menu");
            let menu_vis = menu.getAttribute("data-visible");
            let surf_vis = surf.getAttribute("data-visible");
            if (menu_vis === "false" && surf_vis === "false"){
                menu.setAttribute("data-visible","true");
                surf.setAttribute("data-visible","true");
            }
        })
    })

    let footer = document.querySelector(".rollno");
    footer.textContent = data.rno;

    importObject("../common/hamburger.html","../css/hamburger.css","hamburger").then((elem) => {
        addRipples(elem.getElementsByTagName("button"));
        let name = elem.querySelector(".student-name");
        let roll = elem.querySelector(".student-roll");
        name.textContent = data.name;
        roll.textContent = data.rno;

        let logoutb = elem.querySelector(".logout")
        logoutb.addEventListener("click",(event) => {
            auth.signOut();
        })

        let surf = elem.querySelector(".menu-surface");
        surf.addEventListener("click",(event) => {
            let menu = elem.querySelector(".hamburger-menu");
            let menu_vis = menu.getAttribute("data-visible");
            let surf_vis = surf.getAttribute("data-visible");
            if (menu_vis === "true" && surf_vis === "true"){
                menu.setAttribute("data-visible","false");
                surf.setAttribute("data-visible","false");
            }
        })
    });

    removeObject(document.querySelector(".loading"),document.querySelector(".load-css"));

}


function makeFacultyExamPage(data){
    importObject("../common/nav.html","../css/nav.css","replace_with_nav").then((elem) =>{
        addRipples(elem.getElementsByTagName("button")) 

        let menub = elem.querySelector(".topnav-hamburger-menu");
        menub.addEventListener("click", (event) => {
            console.log("Hamburher menu commenced!")
            let surf = document.querySelector(".menu-surface");
            let menu = document.querySelector(".hamburger-menu");
            let menu_vis = menu.getAttribute("data-visible");
            let surf_vis = surf.getAttribute("data-visible");
            if (menu_vis === "false" && surf_vis === "false"){
                menu.setAttribute("data-visible","true");
                surf.setAttribute("data-visible","true");
            }
        })
    })

    let footer = document.querySelector(".rollno");
    footer.textContent = data.rno;

    let stat = document.querySelector(".status");
    stat.textContent = "Faculty Login";

    let ftname = document.querySelector(".username");
    ftname.style.color = "#ffBf4f";

    importObject("../common/hamburger.html","../css/hamburger.css","hamburger").then((elem) => {
        addRipples(elem.getElementsByTagName("button"));
        let name = elem.querySelector(".student-name");
        let roll = elem.querySelector(".student-roll");
        name.textContent = data.name;
        roll.textContent = data.rno;

        let logoutb = elem.querySelector(".logout")
        logoutb.addEventListener("click",(event) => {
            auth.signOut();
        })

        let surf = elem.querySelector(".menu-surface");
        surf.addEventListener("click",(event) => {
            let menu = elem.querySelector(".hamburger-menu");
            let menu_vis = menu.getAttribute("data-visible");
            let surf_vis = surf.getAttribute("data-visible");
            if (menu_vis === "true" && surf_vis === "true"){
                menu.setAttribute("data-visible","false");
                surf.setAttribute("data-visible","false");
            }
        })
    });

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
            if (data.faculty === "false"){
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