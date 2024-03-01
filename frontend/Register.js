const emailEle = document.querySelector('.email');
const nameEle=document.querySelector(".name");
const mobileEle=document.querySelector(".mobile")
const passwordEle=document.querySelector("#password")
const confirm = document.querySelector("#confirm_password");
const verfEle = document.querySelector('.verification');
const successEle = document.querySelector('.success');
const errorEle = document.querySelector('.error');
const otp_inputs = document.querySelectorAll('.otp_num');
const emailpartialEle = document.querySelector('.emailpartial');
document.querySelector("form").addEventListener("submit",register)
const regex = new RegExp('[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}');
let otp_check = '';
let Body={}

// let submit = document.querySelector(".submit-button");
// let 

var check = function() {
if (document.getElementById('password').value ==
document.getElementById('confirm_password').value) {
document.getElementById('message').style.color = 'green';
document.getElementById('message').innerHTML = 'matching';
} else {
document.getElementById('message').style.color = 'red';
document.getElementById('message').innerHTML = 'not matching';
}
}



function myFunction() {
var x = document.querySelector(".myInput");
if (x.type === "password") {
x.type = "text";
} else {
x.type = "password";
}
}



otp_inputs.forEach(
     (ip) => {
         ip.addEventListener('keyup', moveNext)
     }
 )
 function moveNext(event) {
    // otp_num_4

    let current = event.target;
    let index = current.classList[1].slice(-1);
    if (event.keyCode == 8 && index > 1) {
        current.previousElementSibling.focus()
    }
    else if (index < 4) {
        current.nextElementSibling.focus()

    }
}

 function register(event) {
    event.preventDefault()
    let email=emailEle.value;
    let Name=nameEle.value;
    let mobile=mobileEle.value;
    let password=passwordEle.value;
    let conform = confirm.value;
    Body={Name,email,mobile,password}
    console.log(Body)
    if (regex.test(Body.email)) {
        fetch('https://funny-deer-bracelet.cyclic.app/mail/sendotp', {
            method: "POST",
            body: JSON.stringify(Body),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(
                (res) => {
                    if(password!=conform){
                        alert("password is not matching");
                    }
                    else if (res.status == 200) {
                        alert("OTP has been sent to your email")
                        document.querySelector(".data").style.display="none"
                        verfEle.style.display = 'block';
                        emailpartialEle.value = "***" + email.slice(3)
                        emailEle.value = ''
                    }
                    else {
                        errorEle.style.display = 'block';
                        errorEle.innerHTML = "Email not exist";
                        successEle.style.display = 'none';

                    }
                }
            )

    }
    else {
        errorEle.style.display = 'block';
        errorEle.innerHTML = "Invalid Email";
        successEle.style.display = 'none';

    }
 }
 function verifyotp(){
    otp_check = '';
    for (ip of otp_inputs) {
        otp_check += ip.value
       
    }
    if (otp_check.length == 4) {
        verifyOTP()
    }
 } 
 
           

 function verifyOTP() {

    console.log("hi")
    fetch('https://funny-deer-bracelet.cyclic.app/mail/verify',
        {
            method: "POST",
            body: JSON.stringify({
                "otp": `${otp_check}`
            }),
            headers: { 'Content-Type': 'application/json' }


        }
    )
        .then(
            (res) => {
                console.log(res)
                if (res.status == 200) {
                    verfEle.style.display = 'none';
                    successEle.style.display = 'block';
                    errorEle.style.display = 'none';
                    window.location.href="login.html"
                }
                else {
                    errorEle.style.display = 'block';
                    errorEle.innerHTML = "Invalid OTP";
                    successEle.style.display = 'none';

                }
            }
        )

}