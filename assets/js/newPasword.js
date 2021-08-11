/**
 * 
 * Change password script
 * 
 * @author Anselme Zodehougan
 * @link https://github.com/anso21
 * 
 * 
 */

window.addEventListener('DOMContentLoaded', (e)=>{
    let form =  document.querySelector('form');
    let alertField = document.querySelector('.alert');
    let url = ""    //link to the contact file located on the server
    let formBtn = document.querySelector('button[type=submit]');

    let helpBlock = document.querySelector('.help-block');
    let password = document.getElementById('password');
    let passwordConfirmation = document.getElementById('password_confirmation');


    // Here we check if passwords are matching
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


    // Contact server
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Disable the submit btn and change the content
        formBtn.disabled = true;
        formBtn.lastChild.data = ' Changement en cours...';

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {

                // Retablish the normal behaviour
                formBtn.disabled = false;
                formBtn.lastChild.data = ' Changer mon mot de passe';
                

                let response = "";

                if(xhr.status === 200) {
                    response = xhr.responseText;
                    // Redirect user to login page
                    location.href = '/views/login.html';
                } else{
                    if(alertField.classList.contains('alert-success')) {
                        alertField.classList.replace('alert-success', 'alert-danger');
                    } else{
                        alertField.classList.add('alert-danger');
                    }
                    response = xhr.responseText;
                }

                //Display Flash message
                alertField.textContent = response;
                alertField.style.display = "block";

                setTimeout(() => {
                    alertField.style.display = "none"
                }, 5000);

            }
        }

        // create new FormData
        formData = new FormData(form);

        // Send request
        xhr.send(formData);
    });
});