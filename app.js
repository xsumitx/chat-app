const express=require('express');
const app=express();
const path = require('path');
app.use(express.json());
const jwt=require('jsonwebtoken');

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));


const sequelize=require('./model/server.js')
const registeruser=require('./controllers/register')
const auth=require('./controllers/auth')
const login=require('./controllers/login')
app.use(express.static(path.join(__dirname, 'public')));


app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/register.html'))
})
app.post('/register',registeruser.addNewUser);
app.post('/login',login.verifyUser);


sequelize.sync()
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });
