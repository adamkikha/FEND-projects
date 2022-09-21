/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

let sections = document.getElementsByTagName("section");

function toggleActiveClass(section){
    if (!section.classList.contains("your-active-class")){
        document.getElementsByClassName("your-active-class")[0].classList.remove("your-active-class");
        section.classList.add("your-active-class");
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function buildNavMenu(sections){
    if(sections.length>0){
        let doc = document.createDocumentFragment();
        for (let section of sections){
            let item = document.createElement("li");
            item.textContent = section.dataset.nav;
            item.classList.add("menu__link");
            doc.appendChild(item);
        }
        let navBar = document.getElementById("navbar__list");
        navBar.appendChild(doc);
        navBar.addEventListener("click",scrollTo);
    }
}


function detectActiveSection(){
    console.log(document.getElementsByClassName("your-active-class")[0].id);
    for (let section of sections){
        let rect = section.getBoundingClientRect();
        if (rect.y + rect.height >= 300){
            toggleActiveClass(section);
            return;    
        }
    }
}


function scrollTo(event){
    for (let section of sections){
        if (event.target.textContent === section.dataset.nav){
            section.scrollIntoView();
            toggleActiveClass(section);
        }
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

buildNavMenu(sections);
document.body.addEventListener("mousewheel",detectActiveSection);


