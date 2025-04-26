const form = document.querySelector('form.menu');
const message = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData.entries());

     
    const emptyEntrys = Object.entries(formEntries).some(([key, value]) => {
      return !value || value.trim() === '';
    });


    if (emptyEntrys) {
      message.innerHTML = "Please fill all the camps!!";
      return;
    }

    const data = {
      mode: "login",
      entry: formEntries,
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
      console.log(data)
    

      switch (jsonResponse.result) {
        case "invalidCredentials":
          message.innerHTML = "User not found!";
          break;
          
          case "success":
            message.innerHTML = "User not found!";
            
            localStorage.setItem("loggedUser", JSON.stringify(jsonResponse.user));
          window.location.pathname = "/home/"
          
          break;
      }
    
    }
  })
  })