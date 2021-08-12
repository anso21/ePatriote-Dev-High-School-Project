// includeLayout('nav-dark', 'authenticated_user_header.html').then(r => {
    toggleResponsiveMenu();
    showSubmenu();
// });
// includeLayout('footer', 'footer.html').then(r => console.log(r));



/**
 * 
 * @param {string} id 
 * @param {string} url 
 * @returns Promise<string> 
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