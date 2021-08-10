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
    makeActive();
    openModal();
});


/**
 * 
 *  Toggle to active class when the page is activ
 * 
 */
function makeActive() {
    // Get all menu items
    let navItems = document.querySelectorAll('.nav-items .nav-link');
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