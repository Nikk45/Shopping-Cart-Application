onload = ()=>{
    if(sessionStorage.getItem('currentUser')){
        location.href = "../shop/shop.html";
    }
}

const login = document.querySelector('.login');

const email = document.getElementById('email');
const password = document.getElementById('password');
let warning = document.getElementById('warning');


login.addEventListener('click', (e)=>{

    e.preventDefault();

    let users = JSON.parse(localStorage.getItem('users'));
    console.log(users);

    let emailId = email.value.trim();
    let loginPassword = password.value.trim();
    
    let isEmail  = false, isPassword = false;

    let currentUser;
    users.forEach((user) => {
        if(user.email === emailId){
            isEmail = true;
            if(user.password === loginPassword){
                isPassword = true;
                currentUser = user;
            }
        }
    });
    
    if(isEmail === false){
        warning.innerHTML = 'Incorrect Email';
        return;
    }
    if(isPassword === false){
        warning.innerHTML = 'Incorrect password';
        return;
    }


    // let currentUser = {
    //     email : email.value.trim(),
    //     password : password.value.trim(),
    // }

    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));


    warning.innerHTML = 'Login Successful'

    setTimeout(()=>{
        location.href = '../shop/shop.html'
    },2000)

})
