const form = document.querySelector('form.menu');
const message = document.getElementById('message');
const user = JSON.parse(localStorage.getItem('loggeduser'))
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData.entries());

     
    const emptyEntrys = Object.entries(formEntries).some(([key, value]) => {
      return !value || value.trim() === '';
    });

    
    if (emptyEntrys) {
      alert("Please fill all the camps!!")
      return;
    }

    const data = {
      mode: "login",
      entry: {
        id: user.id,
        ...formEntries,
      },
  }

  await fetch('/loadUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response) => {
    if (response.ok) {
      const jsonResponse = await response.json();
    

      switch (jsonResponse.result) {
        case "invalidCredentials":
          message.innerHTML = "User not found!";
          break;

          
          case "success":
            console.log(jsonResponse)
            localStorage.setItem("loggedUser", JSON.stringify(jsonResponse.user));
          window.location.pathname = "/home/"
          
          break;
      }
    
    }
  })
  })