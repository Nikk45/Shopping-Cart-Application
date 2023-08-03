const signup = document.getElementById('signup-btn');

const warning = document.getElementById('warning');


const fName = document.getElementById('first-name');
const lName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

//  adding event listener to singup button

signup.addEventListener('click',(e)=>{
    e.preventDefault();

    warning.innerHTML = '';

    let users = JSON.parse(localStorage.getItem("users"));

    if(users === null){
        users = [];
    }

    // console.log(users);

    if(fName.value.trim() === '' || lName.value.trim() === '' || email.value.trim() === ''||
    password.value.trim() === '' || confirmPassword.value.trim() === ''){
        warning.innerHTML = "Error: All Fields Are Mandatory!";
        return;
    }

    if(!isValidEmail(email.value.trim())){
        warning.innerHTML = 'Please Enter Valid Email!'; 
        return;
    }

    if(password.value.trim() !== confirmPassword.value.trim()){
        console.log("wrong password");
        warning.innerHTML = `Password Do Not Match!`;
        return;
    }

    if(users){
        
        let isValid =  users.find((user)=>{
            return user.email === email.value.trim();
        })

        if(isValid){
            // console.log(user.email);
            warning.innerHTML = "Email Already Used!"
            return;
        }
        else{
            let user = {
                fName : fName.value.trim(),
                lName : lName.value.trim(),
                email : email.value.trim(),
                password : password.value.trim(),
                confirmPassword : confirmPassword.value.trim()
            }

            users.push(user);
            localStorage.setItem("users",JSON.stringify(users));

            warning.innerHTML = 'Account Successfully Created.'

            setTimeout(()=>{
                location.href = '../login/login.html';
            },2000);

            fName.value = '';
            lName.value = '';
            email.value = '';
            password.value = '';
            confirmPassword = '';
        }
    }

})



function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
