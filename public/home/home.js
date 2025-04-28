const screen = document.querySelector("div.menu");

const local = localStorage.getItem("loggedUser");


if (!local) {
    window.location.pathname = `/`;
}
else {
    const user = JSON.parse(local)
    screen.innerHTML = `<p>Olá ${user.userName}!</p>` 
    + `<img  src=\"../${user.pic}\"   />`
    + screen.innerHTML
    
}


function createEventPage() {
    window.location.pathname = '/createevent/'
}

function explorePage() {
    window.location.pathname = '/explore/'
}
