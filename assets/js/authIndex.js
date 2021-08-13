/**
 * 
 * Contact managment script
 * 
 * @author Anselme Zodehougan
 * @link https://github.com/anso21
 * 
 * 
 */
    
window.addEventListener('DOMContentLoaded', (e)=>{

    toggleResponsiveMenu();
    showSubmenu();

    // User navigation 
    let userType = location.href.split('/')[4];

    if (userType === 'students') {
        
        // By default we inculde programs field like the student home
        includeLayout('programs', '/views/students/programs.html')
            .then(r => {console.log(r) ;dropdown()})
            .catch(err => console.log(err));
    
        // Students navigation
        includeWithDropdown('gradebooksLink', ['programs', 'profile'], 'gradebooks', '/views/students/gradebooks.html');
        includeWithDropdown('programsLink', ['gradebooks', 'profile'], 'gradebooks', '/views/students/programs.html');
        includeWithDropdown('profileLink', ['programs', 'gradebooks'], 'gradebooks', '/views/students/profile.html');

    } else if (userType === 'teachers') {
        // By default we inculde class infos field like the teacher home
        includeLayout('class', '/views/teachers/class.html')
            .then(r => {
                showProgrammingForm();
                dropdown();
                openModal();
            }).catch(err => console.log(err));

        // Teachers navigation
        includeWithDropdown('classLink', ['courses'], 'class', '/views/teachers/class.html', true);
        // openModal();
        includeWithDropdown('coursesLink', ['class'], 'courses', '/views/teachers/courses.html');
        
    } else if (userType === 'censors') {
      
    } 
});


/**
 * 
 * 
 * Function which manage the navigation
 * 
 * @param {string} linkId : The menu "a" element id
 * @param {Array<string>} fieldToBeBlank : field which will be empty id
 * @param {string} id : The id of the field to be filled
 * @param {string} path : path to the file
 * @param {boolean} other : categorie
 * 
 */
function includeWithDropdown(linkId,fieldToBeBlank ,id, path, other=false) {
    let link = document.getElementById(linkId);

    link.classList.toggle('active');

    let nSibling = link.nextElementSibling;
    let pSibling = link.previousElementSibling;

    
    link.addEventListener('click', (e)=>{
        // e.preventDefault();

        link.classList.toggle('active');
        
        // Inactive others links
        if(nSibling !== null) nSibling.classList.toggle('active');
        if(pSibling !== null) pSibling.classList.toggle('active');

        fieldToBeBlank.forEach( id=> document.getElementById(id).innerHTML = '');

        includeLayout(id, path)
        .then(r => {
            dropdown();
            if (other) {
                openModal();
                showProgrammingForm();
            };

        }).catch(err => console.log(err));
    });
}



/**
 * 
 * Dropdown for the faq
 * 
 */
 function dropdown() {
    let dropdown = document.querySelectorAll('.dropdown-title');

    dropdown.forEach(dp => {

        dp.addEventListener('click', (e)=>{
            // Get icon and body of dropdown
            let icon = e.target.lastElementChild;
            let body = e.target.nextElementSibling;

            // Toggle class
            icon.classList.toggle('dropdown-icon');
            body.classList.toggle('dropdown-body-block');
        });
    });
}


/**
 * 
 * @param {string} id 
 * @param {string} url 
 * @returns Promise<string> 
 */
 function includeLayout(id, url) {

    let element = document.getElementById(id);
    // let loader = document.getElementById('loader');

    return new Promise( (resolve, reject ) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            
            if (xhr.readyState === XMLHttpRequest.DONE) {
                element.textContent = '';
                
                if(xhr.status === 200) {
                    let response = xhr.responseText;
                    element.innerHTML = response
                    resolve('Layout loaded successfully !');
                }
                reject('Layout not loaded !');
                // loader.style.display = 'none';
                
            } else {
                element.innerHTML = "<div class='container'> Veuillez patienter un instant...</div>";
                // loader.style.display = 'block'
            }
        }
        xhr.send();
    });
}



/**
 * Toggle to responsive menu
 */
function toggleResponsiveMenu() {
    let trigger = document.getElementById('menu-icon');
    let navbar = document.getElementById('navbar');
    let fa = trigger.children[0];
    
    trigger.addEventListener('click', (e)=> {
        e.preventDefault();

        navbar.classList.toggle('visible');

        // Change the menu icon according to the status : closing or opening
        if (fa.classList.contains('fa-bars')) {

            fa.classList.remove('fa-bars'); 
            fa.classList.add('fa-times');

        } else{

            fa.classList.add('fa-bars');
            fa.classList.remove('fa-times');
        }
        
    });
}



/**
 * 
 * Function to show submenu on the click
 * @returns void
 */
function showSubmenu() {

    let mail = document.querySelector('.user-mail');
    let profile = document.querySelector('.avatar');
    let submenu = document.querySelector('.submenu');

    mail.addEventListener('click', ()=> {
        console.log('ok');
        submenu.classList.toggle('visible');
    });     


    profile.addEventListener('click', ()=> {
        console.log('okay');
        submenu.classList.toggle('visible');
    });     

    window.onclick = function(e) {
        if (!e.target.matches('.user-mail') || !e.target.matches('.avatar')) {
            if (submenu.classList.contains('visible')) {
                submenu.classList.remove('visible');
            }
        }
    }
}

/**
 * 
 * Modal menu for selecting the type of registration
 * 
 */
 function openModal(){
    // Get the modal
    let modal = document.getElementById('myModal');
    let btns = document.querySelectorAll('.fa-edit');

    
    // Get the <span> element that closes the modal
    let span = document.querySelector(`#myModal span`);
    
    // Open the modal,  When the user clicks the button 
    btns.forEach(btn => {
        btn.addEventListener('click',(e)=>{
            modal.style.display = "block";
        });
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click' , (e)=>{
        modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', (e)=>{
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });
}



function showProgrammingForm() {
    let form = document.getElementById('pForm');
    document.getElementById('pBtn').addEventListener('click',(e)=>{
        if(form.style.display === 'block') {
            form.style.display = 'none';
        } else {
            form.style.display = 'block';
        }
    });
}