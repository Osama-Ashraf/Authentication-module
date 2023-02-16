var users=[];
var regex = /./;
var index =0;

if(JSON.parse(localStorage.getItem('Users')) != null){
    users = JSON.parse(localStorage.getItem("Users"));
}

if (document.title == 'Sign up'){
    var regName = document.getElementById('regName').value ='';
    var regEmail = document.getElementById('regEmail').value ='';
    var regPassword = document.getElementById('regPassword').value ='';
    var regAlert = document.getElementById('regAlert').value ='';
    var btnReg = document.getElementById('btnReg');

    btnReg.addEventListener('click' , function(eventInfo){
        if(validateSignupForm()){
            Signup();
            location.href = 'index.html';
        }
    });


    regName.addEventListener('input' , function(eventInfo){
        regAlert.classList.replace('d-block' , 'd-none');
    });

    regEmail.addEventListener('input' , function(eventInfo){
        regAlert.classList.replace('d-block' , 'd-none');
    });

    regPassword.addEventListener('input' , function(eventInfo){
        regAlert.classList.replace('d-block' , 'd-none');
    });
    
    function validateSignupForm(){
        if(regex.test(regName.value) & regex.test(regEmail.value) & regex.test(regPassword.value)){
            
            var bool=false;
            for(var i =0; i<users.length ; i++){
                if(users[i].email.toLowerCase() == regEmail.value.toLowerCase()){
                    bool = true;
                    break;
                }
            }

            if(bool){
                regAlert.innerHTML = 'This Email is already registered';
                regAlert.classList.replace('d-none' , 'd-block');
            }
            else{
                return true;
            }
        }
        else{
            regAlert.innerHTML = 'All fields are required';
            regAlert.classList.replace('d-none' , 'd-block');
        }
    }

    function Signup(){
        var user = {
            name: regName.value,
            email: regEmail.value,
            password: regPassword.value
        }
        users.push(user);
        localStorage.setItem("Users" , JSON.stringify(users));
    }
}

else if (document.title == 'Login'){
    var loginEmail = document.getElementById('loginEmail');
    var loginPassword = document.getElementById('loginPassword');
    var loginAlert = document.getElementById('loginAlert');
    var btnLogin = document.getElementById('btnLogin');
    

    btnLogin.addEventListener('click' , function(eventInfo){
        if(validateLoginForm()){
            location.href ='home.html';
        }
    });

    loginEmail.addEventListener('input' , function(){
        loginAlert.classList.replace('d-block' , 'd-none');
    });

    loginPassword.addEventListener('input' , function(){
        loginAlert.classList.replace('d-block' , 'd-none');
    });

    function validateLoginForm(){
        if(regex.test(loginEmail.value) & regex.test(loginPassword.value)){
            var bool =false;
            for(var i = 0; i < users.length ; i++){
                if(users[i].email.toLowerCase() == loginEmail.value.toLowerCase()){
                    bool = true;
                    index =i;
                    break;
                }
            }
            if(bool){
                if(users[index].password != loginPassword.value){
                    loginAlert.innerHTML = 'Wrong password!';
                    loginAlert.classList.replace('d-none' , 'd-block');
                    return false;
                }
                else{
                    localStorage.setItem("index" , JSON.stringify(index));
                    return true;
                }
            }
            else{
                loginAlert.innerHTML = 'Wrong email!';
                loginAlert.classList.replace('d-none' , 'd-block');
            }
        }
        else{
            loginAlert.innerHTML = 'All fields are required';
            loginAlert.classList.replace('d-none' , 'd-block');
        }
    }

    
}


else if (document.title == 'Home'){
    var homeName = document.getElementById('homeName');
    var btnLogout = document.getElementById('btnLogout');

    btnLogout.addEventListener('click' , function(){
        location.href = 'index.html';
    });
    index = JSON.parse(localStorage.getItem("index"));
    homeName.innerHTML = `Welcome ${users[index].name}`;
    
    
}
