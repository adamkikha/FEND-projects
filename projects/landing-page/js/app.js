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

// Global variables for all sections and active section

const sections = document.getElementsByTagName("section");
let activeSection = document.getElementsByClassName("your-active-class")[0];

// Updates activeSection with the current active section
function toggleActiveClass(section){
    // Checks if the input section is not the active section
    if (!section.classList.contains("your-active-class")){
        activeSection.classList.remove("your-active-class");
        section.classList.add("your-active-class");
        activeSection = section;
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Builds the navigation menu dynamically
function buildNavMenu(sections){
    if(sections.length>0){
        let doc = document.createDocumentFragment();
        // Creates list elements for each section
        for (let section of sections){
            let item = document.createElement("li");
            item.textContent = section.dataset.nav;
            item.classList.add("menu__link");
            doc.appendChild(item);
        }
        // Attaches the created elements to the DOM
        let navBar = document.getElementById("navbar__list");
        navBar.appendChild(doc);
        navBar.addEventListener("click",scrollTo);
        return navBar.offsetHeight;
    }
}

// Detects which section is active and switches activeSection accordingly
function detectActiveSection(){
    for (let section of sections){
        let rect = section.getBoundingClientRect();
        if (rect.y + rect.height >= 300){
            toggleActiveClass(section);
            return;    
        }
    }
}

// Scrolls to required section
function scrollTo(event){
    event.preventDefault();
    for (let section of sections){
        if (event.target.textContent === section.dataset.nav){
            let rect = section.getBoundingClientRect();
            // Takes into account the navigation bar height
            // so the section heading can always be visible
            // also dectates the smooth behavior
            window.scrollBy({
                            top: rect.y-navBarHeight,
                            left: 0,
                            behavior: "smooth"});
            toggleActiveClass(section);
        }
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/


const navBarHeight = buildNavMenu(sections);
document.body.addEventListener("mousewheel",detectActiveSection);


