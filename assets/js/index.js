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

    // After all we create a loader element and append it to the body

    // Create the loader with its attributes
    let loader = document.createElement('div');
    loader.setAttribute('class', 'loader');
    loader.setAttribute('id', 'loader');

    // Create the loader content with its attributes
    let loaderContent = document.createElement('div')
    loaderContent.setAttribute('class', 'loader-content');

    // Append the loaderContent to loader
    loader.appendChild(loaderContent);

    // Append the loader to the body
    document.body.appendChild(loader);

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
            
            // Include the footer
            includeLayout('footer', 'footer.html');

        }
    ).catch( err => console.log(err));

    // We can execute dropdwon() later or at  any time
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
    // console.log(href);

    // Itterate the navItems to get the active 
    navItems.forEach((item) => {
        if (item.href === href) {
            console.log('ok');
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
    // let loader = document.getElementById('loader');

    return new Promise( (resolve, reject ) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', `${baseUrl}${url}`, true);
        xhr.onreadystatechange = () => {
            
            if (xhr.readyState === XMLHttpRequest.DONE) {

                if(xhr.status === 200) {
                    let response = xhr.responseText;
                    element.innerHTML = response
                    resolve('Layout loaded successfully !');
                }
                reject('Layout not loaded !');
                // loader.style.display = 'none';

            } else {
                // loader.style.display = 'block'
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


/**
 * 
 * This function check if the passwords fields are matching
 * 
 * @param passwordConfirmation HTMLInputElement 
 * @param password HTMLInputElement : the reference field
 * 
 * @returns void
 */

function passwordFieldsChecker(passwordConfirmation, password) {
    passwordConfirmation.addEventListener('input', (e) => {
        let value = e.target.value;
        if (value !== password.value) {
            passwordConfirmation.style.boxShadow = '0 0 5px red';
            helpBlock.style.display = 'block';
            helpBlock.textContent = 'Les mots de passe ne se correspondent pas !'
        } else {
            helpBlock.style.display = 'none';
            passwordConfirmation.style.boxShadow = 'none';
        }
    });
}