let form =  document.querySelector('form');
let alertField = document.querySelector('.alert');
let url = ""    //link to the contact file located on the server

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

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {

            if(xhr.status === 200) {
                /**
                 * The response here will be the type of user:
                 *      - Student
                 *      - Parent
                 *      - Teacher
                 *      - Censor
                 *      - Informatician
                 * 
                 * So according to the type we will redirecte user
                 */
                let response = xhr.responseText;
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
                //Display Flash message
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