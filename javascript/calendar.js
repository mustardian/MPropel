import { getFromDB, addToDB } from './firebase/db.js';
let fetchedData= [];

function formCalendar(examDates,obj){ //obj is required to handle importing the calendar 
    
    // find the calendar div

    const calendarDaysGrid = document.getElementsByClassName('days-display')[0];

    // create a new date
    const date = new Date();
    
    // get the current month
    var currentMonth = date.getMonth(); // 0-11
    const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonthName = allMonths[currentMonth];
    const currentDay = date.getDate(); // would return DD
    const totalDaysInMonth = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate(); // would returns total days in month ex 31 in January
    var currentYear = date.getFullYear(); // would return YYYY
    const currentDayOfWeek = date.getDay(); // would return 0-6 where 0 is Sunday
    const lastDayOfPreviousMonth = new Date(date.getFullYear(),date.getMonth(),0).getDate(); // would return the last day of previous month ex 28 in February
    const firstDayOfCurrentMonth = new Date(date.getFullYear(),date.getMonth(),1).getDay(); // would return the first day of current month ex 0-6 where 0 is Sunday
    
    // divs to hold the days
    const daysOfPreviousMonth = [];
    const daysOfCurrentMonth = [];
    const daysOfNextMonth = [];

    // create the days of the previous month
    for(let i = firstDayOfCurrentMonth - 1; i >= 0; i--){
        daysOfPreviousMonth.push(lastDayOfPreviousMonth - i);
    }
    for(let i = 1; i <= totalDaysInMonth; i++){
        daysOfCurrentMonth.push(i);
    }
    for(let i = 1; i <= 42 - firstDayOfCurrentMonth - totalDaysInMonth; i++){
        daysOfNextMonth.push(i);
    }
    
    // Set Month and Year

    if (obj) {
        obj.querySelector('.current-month h2').innerHTML = `${currentMonthName} ${currentYear}`;
    }
    else{
        document.querySelector('.current-month h2').innerHTML = `${currentMonthName} ${currentYear}`;
    }
    

    // loops for current stuff
        // loop for previous month
        for(let i = 0 ; i < daysOfPreviousMonth.length; i++){
            let prevMonthDayDiv = document.createElement('div');
            prevMonthDayDiv.classList.add('day-hover');
            prevMonthDayDiv.style.cursor = 'pointer';
            prevMonthDayDiv.style.alignContent = 'center';
            let prevMonthDayP = document.createElement('p');
            prevMonthDayP.classList.add('previous-month');
            prevMonthDayP.classList.add('dim');
            prevMonthDayP.classList.add('default-font');
            prevMonthDayP.innerHTML = daysOfPreviousMonth[i];
            prevMonthDayDiv.appendChild(prevMonthDayP);
            prevMonthDayDiv.onclick = function(){
                currentMonth-=1
                if(currentMonth === 0){
                    currentMonth = 11;
                    currentYear -= 1;
                }
                changemonth(currentMonth, currentYear, calendarDaysGrid, examDates, obj);
            }
            calendarDaysGrid.appendChild(prevMonthDayDiv);
        }
        // loop for current month
        for(let i = 0; i < daysOfCurrentMonth.length; i++){
            let currentMonthDayDiv = document.createElement('div');
            currentMonthDayDiv.classList.add('current-month-days-div');
            currentMonthDayDiv.classList.add('day-hover');
            currentMonthDayDiv.style.alignContent = 'center';
            currentMonthDayDiv.style.cursor = 'pointer';
            let currentMonthDayP = document.createElement('p');
            
            // if the day is today
            if (daysOfCurrentMonth[i] === currentDay){
                currentMonthDayDiv.classList.remove('day-hover');
                currentMonthDayDiv.classList.add('today');
                currentMonthDayDiv.classList.add('selected-day');
                startPopulatingTasks(daysOfCurrentMonth[i], currentMonth, currentYear,fetchedData);
            }

            currentMonthDayP.classList.add('default-font');
            currentMonthDayP.innerHTML = daysOfCurrentMonth[i];

            // clicking on a day

            currentMonthDayDiv.onclick = function(){

                // find divs with class name selected-day
                const selectedDayDivs = document.getElementsByClassName('selected-day');
                // remove the class name selected-day from all of them
                for(let i = 0; i < selectedDayDivs.length; i++){
                    selectedDayDivs[i].classList.add('day-hover');
                    selectedDayDivs[i].classList.remove('selected-day');
                }

                currentMonthDayDiv.classList.add('selected-day');
                currentMonthDayDiv.classList.remove('day-hover');
                try{
                    let event_day_elements = document.getElementsByClassName("event-day");
                        for(let k = 0; k < event_day_elements.length; k++){
                            event_day_elements[k].classList.add("event-day-underline");
                        }
                    if(document.getElementsByClassName("selected-day")[0].childNodes[1].classList.contains('event-day-underline')){
                        document.getElementsByClassName("selected-day")[0].childNodes[1].classList.remove("event-day-underline");
                    }
                }catch(err){
                }

                startPopulatingTasks(daysOfCurrentMonth[i], currentMonth, currentYear,fetchedData);
            }

            
            currentMonthDayDiv.appendChild(currentMonthDayP);
            calendarDaysGrid.appendChild(currentMonthDayDiv);

            // condition for if the day has an event
        
            for(let j = 0; j < examDates.length; j++){

                if(Number(examDates[j][1]) === currentMonth+1 && Number(examDates[j][0]) === daysOfCurrentMonth[i] && Number(examDates[j][2]) === currentYear
                && Number(examDates[j][0]) > currentDay){

                    let eventDayDiv = document.createElement('div');
                    eventDayDiv.classList.add('event-day');
                    eventDayDiv.classList.add('event-day-underline');
                    // handle the weird offset of <p>
                    currentMonthDayP.style.position = 'relative';
                    currentMonthDayP.style.bottom = '0px';

                    currentMonthDayDiv.appendChild(eventDayDiv);
                }
            }    
        }
            // loop for next month
            for(let i = 0; i < daysOfNextMonth.length; i++){
                let nextMonthDayDiv = document.createElement('div');
                nextMonthDayDiv.classList.add('day-hover');
                nextMonthDayDiv.style.cursor = 'pointer';
                nextMonthDayDiv.style.alignContent = 'center';
                let nextMonthDayP = document.createElement('p');
                nextMonthDayP.classList.add('next-month');
                nextMonthDayP.classList.add('dim');
                nextMonthDayP.classList.add('default-font');
                nextMonthDayP.innerHTML = daysOfNextMonth[i];
                nextMonthDayDiv.appendChild(nextMonthDayP);
                nextMonthDayDiv.onclick = function(){
                    currentMonth+=1;
                    if(currentMonth === 12){
                        currentMonth = 0;
                        currentYear += 1;
                    }
                    changemonth(currentMonth, currentYear, calendarDaysGrid, examDates, obj);
                }
                calendarDaysGrid.appendChild(nextMonthDayDiv);
            }
    // next month button
    const nextMonthButton = document.getElementsByClassName('next-month-button')[0];
    nextMonthButton.onclick = function(){
        currentMonth+=1;
        if(currentMonth === 12){
            currentMonth = 0;
            currentYear += 1;
        }
        changemonth(currentMonth, currentYear, calendarDaysGrid, examDates, obj);
    }
    // previous month button
    const previousMonthButton = document.getElementsByClassName('previous-month-button')[0];
    previousMonthButton.onclick = function(){
        currentMonth-=1
        if(currentMonth === -1){
            currentMonth = 11;
            currentYear -= 1;
        }
        changemonth(currentMonth, currentYear, calendarDaysGrid, examDates, obj);
    }
}

function makeCalendar(the_class_name){
    console.log("Make calendar is called!!!")
    const location = "classes/"+the_class_name+"/Tests";
    let examDates = [];
    const data = getFromDB(location);
    data.then(
        function(result){
            fetchedData = result['fetchedData'];
            for(let i = 0; i < fetchedData.length; i++){
                const temp = fetchedData[i]['date'];
                examDates.push(temp.split('/'));
            }
            formCalendar(examDates);
            
        }
    )

}

function populateTasks(givenData){
    const tasksSurface = document.getElementsByClassName('tasks-surface')[0];
    tasksSurface.innerHTML = '';

    // if there are tasks
    if (Object.keys(givenData).length>0){
        for (let i = 0; i < Object.keys(givenData).length; i++){
            const ul = document.createElement('ul');
            ul.classList.add('task-element');
            ul.classList.add('default-font');
    
            const li1 = document.createElement('li');
            li1.classList.add('task-title');
            const li2 = document.createElement('li');
            li2.classList.add('task-time');
            
            li1.innerHTML = givenData[i]['name'];
            li2.innerHTML = givenData[i]['time'];
            ul.appendChild(li1);
            ul.appendChild(li2);
            tasksSurface.appendChild(ul);
        }
    }
    // if there are no tasks
    else{
        const ul = document.createElement('ul');
        ul.classList.add('task-element');
        ul.classList.add('default-font');
        const li1 = document.createElement('li');
        li1.classList.add('task-title');
        const li2 = document.createElement('li');
        li2.classList.add('task-time');
        li1.innerHTML = 'No exams for the specified date';
        li2.innerHTML = '';
        ul.appendChild(li1);
        ul.appendChild(li2);
        tasksSurface.appendChild(ul);
    }


}

function startPopulatingTasks(currentDay,currentMonth,currentYear,fetchedData){
    let neededData = {};
    let count = 0;
    if(currentMonth+1 < 10){
        currentMonth = '0'+String(parseInt(currentMonth)+1);
    }else{
        currentMonth = String(parseInt(currentMonth)+1);
    }


    if(currentDay < 10){
        currentDay = '0'+String(parseInt(currentDay));
    }
    const date = currentDay+'/'+currentMonth+'/'+currentYear;
    
    for(let i = 0 ; i < fetchedData.length; i++){   
        if(fetchedData[i]['date'] === date){
            neededData[count] = fetchedData[i];

            count++;
        }
    }
    populateTasks(neededData);
    
}

function changemonth(currentMonth, currentYear, calendarDaysGrid, examDates ,obj){
    const date = new Date();
    const actualCurrentDay = date.getDate();
    const actualCurrentMonth = date.getMonth();
    const actualCurrentYear = date.getFullYear();

    const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const firstDayOfCurrentMonth = new Date(date.getFullYear(),currentMonth,1).getDay(); // would return the first day of current month ex 0-6 where 0 is Sunday
    const lastDayOfPreviousMonth = new Date(date.getFullYear(),currentMonth,0).getDate(); // would return the last day of previous month ex 28-31 where 28 is the last day of previous month
    const totalDaysInMonth = new Date(date.getFullYear(),currentMonth+1,0).getDate(); // would return the total days in current month ex 28-31 where 28 is the last day of current month


    calendarDaysGrid.innerHTML = '';

    // divs to hold the days
    const daysOfPreviousMonth = [];
    const daysOfCurrentMonth = [];
    const daysOfNextMonth = [];

    // create the days of the previous month
    for(let i = firstDayOfCurrentMonth - 1; i >= 0; i--){
        daysOfPreviousMonth.push(lastDayOfPreviousMonth - i);
    }
    for(let i = 1; i <= totalDaysInMonth; i++){
        daysOfCurrentMonth.push(i);
    }
    for(let i = 1; i <= 42 - firstDayOfCurrentMonth - totalDaysInMonth; i++){
        daysOfNextMonth.push(i);
    }

    // Set Month and Year

    const currentMonthName = allMonths[currentMonth];

    if (obj) {
        obj.querySelector('.current-month h2').innerHTML = `${currentMonthName} ${currentYear}`;
    }
    else{
        document.querySelector('.current-month h2').innerHTML = `${currentMonthName} ${currentYear}`;
    }
    // loops for current stuff
        // loop for previous month
        for(let i = 0 ; i < daysOfPreviousMonth.length; i++){
            let prevMonthDayDiv = document.createElement('div');
            prevMonthDayDiv.classList.add('day-hover');
            prevMonthDayDiv.style.cursor = 'pointer';
            prevMonthDayDiv.style.alignContent = 'center';
            let prevMonthDayP = document.createElement('p');
            prevMonthDayP.classList.add('previous-month');
            prevMonthDayP.classList.add('dim');
            prevMonthDayP.classList.add('default-font');
            prevMonthDayP.innerHTML = daysOfPreviousMonth[i];
            prevMonthDayDiv.appendChild(prevMonthDayP);
            prevMonthDayDiv.onclick = function(){
                currentMonth-=1
                if(currentMonth === 0){
                    currentMonth = 11;
                    currentYear -= 1;
                }
                changemonth(currentMonth, currentYear, calendarDaysGrid, examDates, obj);
            }
            calendarDaysGrid.appendChild(prevMonthDayDiv);
        }
        // loop for current month
        for(let i = 0; i < daysOfCurrentMonth.length; i++){
            let currentMonthDayDiv = document.createElement('div');
            currentMonthDayDiv.classList.add('day-hover');
            currentMonthDayDiv.style.alignContent = 'center';
            currentMonthDayDiv.style.cursor = 'pointer';
            let currentMonthDayP = document.createElement('p');

            // if the day is today
            if (daysOfCurrentMonth[i] === actualCurrentDay 
                && currentMonth === actualCurrentMonth 
                && currentYear === actualCurrentYear){
                currentMonthDayDiv.classList.remove('day-hover');
                currentMonthDayDiv.classList.add('today');
                currentMonthDayDiv.classList.add('selected-day');
                startPopulatingTasks(daysOfCurrentMonth[i], currentMonth, currentYear,fetchedData);
            }

            currentMonthDayP.classList.add('default-font');
            currentMonthDayP.innerHTML = daysOfCurrentMonth[i];
            // clicking on a day

            currentMonthDayDiv.onclick = function(){

                // find divs with class name selected-day
                const selectedDayDivs = document.getElementsByClassName('selected-day');
                // remove the class name selected-day from all of them
                for(let i = 0; i < selectedDayDivs.length; i++){
                    selectedDayDivs[i].classList.add('day-hover');
                    selectedDayDivs[i].classList.remove('selected-day');
                }

                currentMonthDayDiv.classList.add('selected-day');
                currentMonthDayDiv.classList.remove('day-hover');
                try{
                    let event_day_elements = document.getElementsByClassName("event-day");
                        for(let k = 0; k < event_day_elements.length; k++){
                            event_day_elements[k].classList.add("event-day-underline");
                        }
                    if(document.getElementsByClassName("selected-day")[0].childNodes[1].classList.contains('event-day-underline')){
                        document.getElementsByClassName("selected-day")[0].childNodes[1].classList.remove("event-day-underline");
                    }
                }catch(err){
                }
                startPopulatingTasks(daysOfCurrentMonth[i], currentMonth, currentYear,fetchedData);
            }

            
            currentMonthDayDiv.appendChild(currentMonthDayP);
            calendarDaysGrid.appendChild(currentMonthDayDiv);

            // condition for if the day has an event
        
            for(let j = 0; j < examDates.length; j++){
                if(Number(examDates[j][1]) === currentMonth+1 
                && Number(examDates[j][0]) === daysOfCurrentMonth[i] 
                && Number(examDates[j][2]) === currentYear){

                    let eventDayDiv = document.createElement('div');
                    eventDayDiv.classList.add('event-day');
                    eventDayDiv.classList.add('event-day-underline');

                    // handle the weird offset of <p>
                    currentMonthDayP.style.position = 'relative';
                    currentMonthDayP.style.bottom = '0px';

                    if (Number(examDates[j][1]) === actualCurrentMonth+1
                    && (Number(examDates[j][0]) <= actualCurrentDay)){

                        // dont append the event

                    }else{
                        currentMonthDayDiv.appendChild(eventDayDiv);
                    }
                }
            }    
        }
            // loop for next month
            for(let i = 0; i < daysOfNextMonth.length; i++){
                let nextMonthDayDiv = document.createElement('div');
                nextMonthDayDiv.classList.add('day-hover');
                nextMonthDayDiv.style.cursor = 'pointer';
                nextMonthDayDiv.style.alignContent = 'center';
                let nextMonthDayP = document.createElement('p');
                nextMonthDayP.classList.add('next-month');
                nextMonthDayP.classList.add('dim');
                nextMonthDayP.classList.add('default-font');
                nextMonthDayP.innerHTML = daysOfNextMonth[i];
                nextMonthDayDiv.appendChild(nextMonthDayP);
                nextMonthDayDiv.onclick = function(){
                    currentMonth+=1;
                    if(currentMonth === 12){
                        currentMonth = 0;
                        currentYear += 1;
                    }
                    changemonth(currentMonth, currentYear, calendarDaysGrid, examDates, obj);
                }
                calendarDaysGrid.appendChild(nextMonthDayDiv);
            }


}

export {makeCalendar};