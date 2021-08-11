/**
 *  This file will be common to all the pages.
 *  It contains all common script and behaviour.
 * 
 * @author Anselme Zodehougan
 * @link https://github.com/anso21
 * @link https://www.w3schools.com/howto/howto_css_modals.html
 * 
 */



// Wait while the DOM content be loaded before execute functions
window.addEventListener('DOMContentLoaded', (e) => {

    // We include the nav first, cause the modal layout depends of it
    includeLayout('nav', 'header.html').then(
        result => {
            makeActive();
            toggleResponsiveMenu();

            // Now we include the modal layout before execute openModal()
            includeLayout('myModal', 'modal.html').then(
                result => {
                    openModal();
                }
            ).catch(err => console.log(err));
        }
    ).catch( err => console.log(err));

    // None event depends of the footer, so we can include it later or at  any time
    includeLayout('footer', 'footer.html');
    // The dropdown() too
    dropdown();
});




/**
 * 
 *  Toggle to active class when the page is active
 * 
 */
function makeActive() {
    // Get all menu items
    let navItems = document.querySelectorAll('.nav .nav-link');
    // Get the actual url
    let href = location.href

    // Itterate the navItems to get the active 
    navItems.forEach((item) => {
        if (item.href === href) {
            item.classList.toggle('active');
        }
    });
}


/**
 * 
 * Include layouts: header, footer
 * 
 * @param id string : The id of the container of the layout
 * @param url string :  The path to the layout file
 * 
 * @returns void
 */

function includeLayout(id, url) {

    let baseUrl = '/views/layouts/';

    let element = document.getElementById(id);

    return new Promise( (resolve, reject ) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${baseUrl}${url}`, true);
        xhr.onreadystatechange = () => {
            
            if (xhr.readyState === 4) {

                if(xhr.status === 200) {
                    let response = xhr.responseText;
                    element.innerHTML = response
                    resolve('Layout loaded successfully !');
                }
                reject('Layout not loaded !')
            }
        }
        xhr.send();
    });
}

/**
 * 
 * Toggle to responsive menu
 * 
 */
function toggleResponsiveMenu() {
    let trigger = document.getElementById('menu-icon');
    let navbar = document.getElementById('nav-items');
    let fa = trigger.children[0];
    
    trigger.addEventListener('click', (e)=> {
        e.preventDefault();

        navbar.classList.toggle('responsive');

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
 * Modal menu for selecting the type of registration
 * 
 */
function openModal(){
    // Get the modal
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("trigger");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // Open the modal,  When the user clicks the button 
    btn.addEventListener('click',(e)=>{
        modal.style.display = "block";
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