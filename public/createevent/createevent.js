const fileInput = document.getElementById('thumbnail');
const preview = document.getElementById('preview');
const form = document.querySelector('form.menu');




fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        preview.style.opacity = "100%";
      preview.src = e.target.result; 
    };

    reader.readAsDataURL(file);
  }
});


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const emptyEntrys = Object.entries(formEntries).some(([key, value]) => {
        return !value || value === '';
    });

    



    
  await fetch('/loadUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response) => {
    if (response.ok) {
     window.location.pathname = '/home/'
    }
  })

})