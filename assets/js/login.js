/**
 * 
 * Login script
 * 
 * @author Anselme Zodehougan
 * @link https://github.com/anso21
 * 
 * 
 */


window.addEventListener('DOMContentLoaded', ()=>{

    let form =  document.querySelector('form');
    let alertField = document.querySelector('.alert');
    let url = ""                                            //link to the contact file located on the server
    let baseUrl = "/views" ;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {
                
                if(xhr.status === 200) {
                    let response = "";
                    /**
                     * The response here will be the type of user:
                     *      - Student
                     *      - Parent
                     *      - Teacher
                     *      - Censor
                     *      - Informatician
                     * 
                     * So according to the type we will redirect user
                     */
                    response = xhr.responseText;
                    if (response === 'student') {
                        location.href = `${baseUrl}/students/dashboard.html`;
                    } else if (response === 'parent') {
                        location.href = `${baseUrl}/parents/dashboard.html`;
                    } else if (response === 'teachers') {
                        location.href = `${baseUrl}/teachers/dashboard.html`;
                    } else if (response === 'censor') {
                        location.href = `${baseUrl}/censor/dashboard.html`;
                    } else if (response === 'informaticians') {
                        location.href = `${baseUrl}/informaticians/dashboard.html`;
                    }
                    
                } else{
                    if(alertField.classList.contains('alert-success')) {
                        alertField.classList.replace('alert-success', 'alert-danger');
                    } else{
                        alertField.classList.add('alert-danger');
                    }
                    let response = xhr.responseText;
                    
                    //Display Flash message to indiacte the errors to users
                    alertField.textContent = response;
                    alertField.style.display = "block";
                    setTimeout(() => {
                        alertField.style.display = "none"
                    }, 5000);

                }

            }
        }

        // create new FormData
        formData = new FormData(form);

        // Send request
        xhr.send(formData);
    });
});