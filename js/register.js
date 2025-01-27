let fname = document.querySelector("#first_name")
let lname = document.querySelector("#last_name")
let email = document.querySelector("#email")
let password = document.querySelector("#password")

let register_btn = document.querySelector("#register")

register_btn.addEventListener ("click" , function (e){
    e.preventDefault()
    if ( fname.value==="" || lname.value===""  ||email.value==="" || password.value ===""){
        alert("please fill data")
    } else {
        localStorage.setItem("first_name" , fname.value);
        localStorage.setItem("last_name" , lname.value);
        localStorage.setItem("email" , email.value);
        localStorage.setItem("password" , password.value); 

        setTimeout ( () => {
            window.location = "login.html"
        } , 1500)
    }
})

