import express from 'express';
import path from 'path';

const app = express()
app.use(express.static('public'))
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json())



app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: path.resolve()})
})


app.get('/login', (req, res) => {
  res.sendFile('./login.html', {root: path.resolve()})
})



app.get('/register', (req, res) => {



    res.sendFile('./register.html', {root: path.resolve()})
})
app.post('/registering', (req, res) => {

    console.log(req.body);


    res.redirect(307, "/register");
})




app.get('/home', (req, res) => {
  res.sendFile('./home.html', {root: path.resolve()})
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})