import express from 'express';
import path from 'path';
import fs from 'fs';
import xlsx from 'xlsx';
import {v4 as uuidv4} from 'uuid';


const app = express()
app.use(express.static('public'))
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// Landing Page
app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: path.resolve()})
})

// Login Page
app.get('/login', (req, res) => {
  res.sendFile('./login.html', {root: path.resolve()})
})


// Register Page
app.get('/register', (req, res) => {



    res.sendFile('./register.html', {root: path.resolve()})
})



// Pagina que lida com toda a logica por tras de usuarios
app.post('/loadUser', (req, res) => {
 
  const data = req.body;
  if (data.mode == "register") { // Verifica se tamos a registrar um usuario ou nao
    const { userName, birthday, email, password, gender } = data.entry;

  const newUser = {  id :uuidv4(), pic: 'profile.jpg', userName, birthday, email, password, gender,  };
  

  //? Vamos agora verificar cada campo

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  
  const newPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  if (!emailValido) {
    return res.send({result: "invalidEmail"});
  }
  else if (!newPassword) {
    return res.send({result: "invalidPassword"});
  }
  else {

  const filePath = path.resolve('users.xlsx');

  let workbook;
  let worksheet;




//  Verifica se o Ficheiro ja Existe
  if (fs.existsSync(filePath)) {
    workbook = xlsx.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const currentUser = xlsx.utils.sheet_to_json(worksheet);



    
    const isEmailAlreadyRegistered = currentUser.some(user => user.email === email);
    if (isEmailAlreadyRegistered) {
      return res.send({result: "emailalreadyregistered"});
    }
  


    currentUser.push(newUser);

    const newSheet = xlsx.utils.json_to_sheet(currentUser);
    workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  } else {

    const newSheet = xlsx.utils.json_to_sheet([newUser]);
    workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, newSheet, 'Users');
  }

  xlsx.writeFile(workbook, filePath);

  res.send({result: 'success'});
  }}


  else if (data.mode == "login") {
    const {email, password} = data.entry

    const filePath = path.resolve('users.xlsx');

    if (!fs.existsSync(filePath)) {
      return res.json({ result: "noUsers" });
    }
  
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets["Users"];
    const users = xlsx.utils.sheet_to_json(worksheet);
    console.log(users)
    const foundUser = users.find(user => user.email == email && user.password == password);
  
    if (!foundUser) {
      return res.json({ result: "invalidCredentials" });
    }

    return res.json({ result: "success", user: foundUser});




  }


  else {
    res.send(req.body);






  }

  
})

app.get('/home', (req, res) => {
  res.sendFile('./home.html', {root: path.resolve()})
})

app.get('/createevent', (req, res) => {
  res.sendFile('./createevent.html', {root: path.resolve()})
})


app.post('/newevent', (req, res) => {
  const data = req.body;

  if (data.mode == "register") {
    const entry = data.entry;


  const filePath = path.resolve('events.xlsx');

  let workbook;
  let worksheet;


  if (fs.existsSync(filePath)) {
    workbook = xlsx.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const currentEvent = xlsx.utils.sheet_to_json(worksheet);

    currentEvent.push(entry);

    const newSheet = xlsx.utils.json_to_sheet(currentEvent);
    workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  } else {

    const newSheet = xlsx.utils.json_to_sheet([entry]);
    workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, newSheet, 'events');
  }

  xlsx.writeFile(workbook, filePath);

  res.send({result: 'success'});
  }}





);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})