onload = ()=>{
    if(!sessionStorage.getItem('currentUser')){
        location.href = "../login/login.html";
    }
}

let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem('users'));

console.log(currentUser);

let fName = document.getElementById('first-name');
let lName = document.getElementById('last-name');

let saveInfo = document.querySelector('.save-info');

fName.value = currentUser.fName;
lName.value = currentUser.lName;

saveInfo.addEventListener('click',(e)=>{

    e.preventDefault();

    currentUser.fName = fName.value;
    currentUser.lName = lName.value;

    sessionStorage.setItem('currentUser',JSON.stringify(currentUser));
    users.find((user)=>{
        if(user.email === currentUser.email){
            user.fName = currentUser.fName;
            user.lName = currentUser.lName;
        }
    })
    localStorage.setItem('users',JSON.stringify(users));
    // console.log(users);

})

let oldPassword = document.getElementById('old-password');
let newPassword = document.getElementById('new-password');
let confirmNewPassword = document.getElementById('confirm-new-password');

let changePassword = document.querySelector('.change-password');
let logout = document.querySelector('.logout');

let warningMsg = document.getElementById('warning');

changePassword.addEventListener('click',(e)=>{
    e.preventDefault();



    if(oldPassword.value === currentUser.password){
        if(newPassword.value === confirmNewPassword.value){
            currentUser.password = newPassword.value;
            currentUser.confirmPassword = newPassword.value;
            sessionStorage.setItem('currentUser',JSON.stringify(currentUser));

            users.find((user)=>{
                if(user.email === currentUser.email){
                    user.password = currentUser.password;
                    user.confirmPassword = currentUser.confirmPassword;
                }
            })
            localStorage.setItem('users',JSON.stringify(users));

            oldPassword.value = '';
            newPassword.value = '';
            confirmNewPassword.value = '';
        }
        else{
            warningMsg.innerHTML = 'New Password Do Not Match!';
            setTimeout(() => {
                warningMsg.innerHTML = '';
            }, 3000);
        }
    }
    else{
        warningMsg.innerHTML = 'Old Password Do Not Match!';
        setTimeout(() => {
            warningMsg.innerHTML = '';
        }, 3000);
    }
})


logout.addEventListener('click',()=>{
    console.log("logging out");
    sessionStorage.removeItem('currentUser');
    setTimeout(()=>{
        location.href = "../login/login.html";
    },2000);
})








