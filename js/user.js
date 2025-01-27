let userInfo = document.querySelector ("#user_info")
let userD = document.querySelector ("#user")
let links = document.querySelector ("#links")


const f_name = localStorage.getItem('first_name');
const l_name = localStorage.getItem('last_name');
if (f_name && l_name) {
    links.remove()
    userInfo.style.display ="flex"
    // userInfo.style.text-align ="center"
    userD.innerHTML = `welcome ${f_name}`;
} else {
     userInfo.style.display="none"
}

let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click", function (){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    } , 1500)
})