import { importObject,summonRipple } from "../common/common.js";

import {
    getAuth,
    onAuthStateChanged //I realized this is trump card to keep track of user login session details WITHOUT using sessionstorage
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

import {app,auth} from "../javascript/firebase/auth.js";
import { getFromDB } from "./firebase/db.js";




window.addEventListener("beforeunload", (event)=> {
    auth.signOut();
})


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
    })
}


function refreshCalander(elem){ //void function {To do: Navigate to different months}
    let date = new Date();

    let month = date.getMonth();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let currentlastday = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate();
    let previouslastday = new Date(date.getFullYear(),date.getMonth() + 0,0).getDate();

    let firstweekday = new Date(date.getFullYear(),date.getMonth(),1).getDay()
    let lastweekday = new Date(date.getFullYear(),date.getMonth()+1,0).getDay()


    if (elem){
        elem.querySelector(".current-month h2").innerHTML = `${months[month]} ${date.getFullYear()}`;
    }
    else{
        document.querySelector(".current-month h2").innerHTML = `${months[month]} ${date.getFullYear()}`;
    }
    

    let days = ""

    for(let i = firstweekday; i > 0; i--){
        days += `<p class = "previous-month dim">${previouslastday - i+1}</p>`
    }

    for(let i = 1;i <= currentlastday;i++){

        if (i === date.getDate()){
            days += `<p class = "today green">${i}</p>`
        }
        else{
            days += `<p>${i}</p>`
        }
    }

    for(let i = 1; i < 7 - lastweekday; i++){
        days += `<p class = "next-month dim">${i}</p>`
    }

    document.querySelector(".days-display").innerHTML = days;

}

function addRipples(objectList){
    for (const button of objectList) {
        button.addEventListener("click", summonRipple); 
    }
}

function makeStudentHomePage(data){
    importObject("../common/calendar.html","../css/calendar.css","replace_with_calendar","exam-widget-grid").then((elem) =>{refreshCalander(elem); addRipples(elem.getElementsByTagName("button")) })

    importObject("../html/potd.html","../css/potd.css","replace_with_potd","potd-widget-grid").then((elem) =>{addRipples(elem.getElementsByTagName("button")) })

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

    //In future make the footer html can also be considered to be imported but I am going with this for now

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

}


//Very dangerous zone ahead. If you mess this up, then the database will consider you as malpraktise!
onAuthStateChanged(auth,(user) => {
    if (user){
        let id = user.uid;
        console.log(id);
        getFromDB("users/"+id).then(data => {
            console.log("Retrieved data successfully!");

            if (!data.faculty){
                makeStudentHomePage(data["fetchedData"]);
            }
            else{
                console.log("Xaferdian was a malpraktise so he left out the part where faculty's page was his problem lol. Bye take care I will take care of your attendance!")
            }
            
        }).catch(data => {
            console.log("Some malpraktise has occurred");
        })
    }
    else{
        console.log("User has logged out!")
        window.location.replace("../html/login.html");
    }
})
 //this should be modified in future


//updateInprogress("MAT", "You are screwed lol!") //only use this when you need to display alert over a running exam.