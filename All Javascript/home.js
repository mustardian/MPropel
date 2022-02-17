//This is a malpraktise where I try to get used to javascript lol
//This malpraktise is not yet complete. Do not assume that this is fully working

const date = new Date();

const month = date.getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const currentlastday = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate();
const previouslastday = new Date(date.getFullYear(),date.getMonth() + 0,0).getDate();

const firstweekday = new Date(date.getFullYear(),date.getMonth(),1).getDay()
const lastweekday = new Date(date.getFullYear(),date.getMonth()+1,0).getDay()


document.querySelector(".current-month h2").innerHTML = `${months[month]} ${date.getFullYear()}`;

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