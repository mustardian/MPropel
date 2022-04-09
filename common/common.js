/* Konichiwa! This has all js this is common to all pages!*/


//----------------------{Ripple effects}-------------------------

/* OK, so basically the function triggers whenever a user CLICKS on ANY button element (1). Then, js will inject a dummy circle element inside the button based on the button and user cursor position which expands from nothing and does malpraktise! */

function summonRipple(onEvent) { 
    const button = onEvent.currentTarget; //Retrieve the specific button element the user is clicking on currently

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter/2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${onEvent.pageX  - (button.offsetLeft + radius)}px`; //After getting absolute cursor coordinate (according to the page), the centre of the circle should coincide with cursor. So the radius value is subtracted. Since we can only control the top and left attributes, these positions are subtracted as well to get the perfect coincidence (atleast thats what I understand. I need a bit more pondering over this. Of all solutions I saw, this seemed to be the most efficient ~Xaferdian)
    circle.style.top = `${onEvent.pageY  - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple"); //Add 'ripple' class to this circle element

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) { //debounce if ripple is already present
    ripple.remove();
    }

    button.appendChild(circle); //inject circle inside button element

}

//NOTE: If suppose we decide that few buttons shall not have ripples, this line alone should be modified
//const allButtons = document.getElementsByTagName("button"); 

/*for (const button of allButtons) {
    button.addEventListener("click", summonRipple); // (1)
}*/ //This function has becoome useless since we are using citrus js to import stuff.



function importObject(path,csspath,target,divname) {
    //html file , css file, 

    let styleref = document.createElement("link");
    styleref.rel = "stylesheet";
    styleref.href = csspath;

    document.querySelector("head").appendChild(styleref);

    let promise = new Promise(function (resolve,reject){ //Can I consider myself the biggest malpraktise for using promise? >_<
        fetch(path)
        .then(res => res.text())
        .then(text => {
            let oldelem = document.querySelector("span#"+target);
            let newelem = document.createElement("div");
            if (divname){
                newelem.classList.add(divname);
            }
            newelem.innerHTML = text;
            oldelem.parentNode.replaceChild(newelem,oldelem);
            resolve(newelem);
        })
    })

    return promise;

}

function removeObject(html,css){
    html.remove()
    css.remove()
}

function setupNavAndHamburger(data,exam_portal = false){
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

function addRipples(objectList){
    for (const button of objectList) {
        button.addEventListener("click", summonRipple); 
    }
}
export {importObject,summonRipple,removeObject,setupNavAndHamburger,addRipples}