/**
 * 
 * Contact managment script
 * 
 * @author Anselme Zodehougan
 * @link https://github.com/anso21
 * 
 * 
 */


window.addEventListener('DOMContentLoaded', (e)=> {
    let form =  document.querySelector('form');
    let alertField = document.querySelector('.alert');
    let formBtn = document.querySelector('button[type=submit]');
    let url = ""    //link to the contact file located on the server

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Disable the submit btn and change the content
        formBtn.disabled = true;
        formBtn.lastChild.data = ' Envoie en cours...';

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {

                // Retablish the normal behaviour
                formBtn.disabled = false;
                formBtn.lastChild.data = ' Envoyer un message';

                let response = "";

                if(xhr.status === 200) {
                    response = xhr.responseText;
                    if(alertField.classList.contains('alert-danger')) {
                        alertField.classList.replace('alert-danger', 'alert-success');
                    } else{
                        alertField.classList.add('alert-success');
                    }
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