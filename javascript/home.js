import { importObject,summonRipple } from "../common/common.js";

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

function makeStudentHomePage(){
    importObject("../common/calendar.html","../css/calendar.css","replace_with_calendar","exam-widget-grid").then((elem) =>{refreshCalander(elem); addRipples(elem.getElementsByTagName("button")) })

    importObject("../html/potd.html","../css/potd.css","replace_with_potd","potd-widget-grid").then((elem) =>{addRipples(elem.getElementsByTagName("button")) })


    importObject("../common/nav.html","../css/nav.css","replace_with_nav").then((elem) =>{addRipples(elem.getElementsByTagName("button")) })
}

makeStudentHomePage() //this should be modified in future


//updateInprogress("MAT", "You are screwed lol!") //only use this when you need to display alert over a running exam.