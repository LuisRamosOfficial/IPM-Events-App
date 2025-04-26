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
async function getEvents () {


await fetch('/getevents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (response) => {
    if (response.ok) {

     const data = await response.json()
     console.log(data)
    }
  })

}

getEvents()