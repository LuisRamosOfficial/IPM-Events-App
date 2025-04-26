const screen = document.querySelector("div.menu");

const local = localStorage.getItem("loggedUser");


if (!local) {
    window.location.pathname = `/`;
}
else {
    const user = JSON.parse(local)
    console.log(user)
    screen.innerHTML = `<p>Olá ${user.userName}!</p>` 
    + `<img  src=\"../${user.pic}\"   />`
    + screen.innerHTML
    
}


function createEventPage() {
    window.location.pathname = '/createevent/'
}