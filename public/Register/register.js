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
        mode: "register",
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


        
        switch (jsonResponse.result) {
          case "invalidEmail":
            message.innerHTML = "Not valid Email!!";
            break;
          case "invalidPassword":
            message.innerHTML = "Password not valid! must contain 8 characters, uppercase and lowercase letters, numbers and a symbol.";
            break;
          case "emailalreadyregistered":
            message.innerHTML = "This account is already registered";
            break;
          
        
          case "success":
            localStorage.setItem("loggedUser", JSON.stringify(data.entry));
            message.innerHTML = "Conta Criada!";
            window.location.pathname = "/home/"
            
            break;
        }

      } else {
        throw new Error('Network response was not ok');
      }
    })   
})