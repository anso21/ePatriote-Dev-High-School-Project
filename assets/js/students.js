/**
 * 
 * Students managment script
 * 
 * @author Anselme Zodehougan
 * @link https://github.com/anso21
 * 
 * 
 */


window.addEventListener('DOMContentLoaded', (e)=>{
   
    // By default we inculde programs field like the student home
    includeLayout('programs', 'programs.html')
    .then(r => {console.log(r) ;dropdown()})
    .catch(err => console.log(err));

    // Get the navigation links
    let gradebooksLink = document.getElementById('gradebooksLink');
    let programsLink = document.getElementById('programsLink');
    let profileLink = document.getElementById('profileLink');

    // Get the fields
    let gradebooks = document.getElementById('gradebooks');
    let programs = document.getElementById('programs');
    let profile = document.getElementById('profile');

    // Include the field by listening the click on the link
    gradebooksLink.addEventListener('click', (e)=>{
        e.preventDefault();
        
        // Empty the fields before including the correpondant layout 
        programs.innerHTML = '';
        profile.innerHTML = '';
        
        // Include
        includeLayout('gradebooks', 'gradebooks.html')
        .then(r => {
            dropdown();
        }).catch(err => console.log(err));
    });

    programsLink.addEventListener('click', (e)=>{
        e.preventDefault();
        
        gradebooks.innerHTML = '';
        profile.innerHTML = '';

        includeLayout('programs', 'programs.html')
        .then(r => {
            dropdown();
        }).catch(err => console.log(err));
    });

    profileLink.addEventListener('click', (e)=>{
        e.preventDefault();
        
        programs.innerHTML = '';
        gradebooks.innerHTML = '';

        includeLayout('profile', 'profile.html')
        .then(r => {
            dropdown();
        }).catch(err => console.log(err));
    });
});



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

    let baseUrl = '/views/students/';

    let element = document.getElementById(id);
    // let loader = document.getElementById('loader');

    return new Promise( (resolve, reject ) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', `${baseUrl}${url}`, true);
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
                element.textContent = 'Veuillez patienter un instant...';
                // loader.style.display = 'block'
            }
        }
        xhr.send();
    });
}
