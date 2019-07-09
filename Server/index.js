var express = require('express')
var bodyparser = require('body-parser')
var bcrypt = require('bcrypt')
var app = express()
var mongoose = require('mongoose')
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/dbangular',{
    useCreateIndex: true,
    useNewUrlParser: true });


const jsonwebtoken = require('./Middelware/jsonwebtoken');
const upload = require('./Middelware/fileupload');

const userController = require('./Controlller/usercontroller');
const cors = require('cors');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/images', express.static('./Images/'));

app.post('/api/register',upload.single('image'),userController.insertUser);

app.post('/api/login',userController.login);

app.put('/api/update/:userId',jsonwebtoken.verifyToken,upload.single('image'),userController.findByIdAndUpdate);

app.get('/api/:userId', jsonwebtoken.verifyToken,userController.getUserById);

app.delete('/api/delete/:userId',jsonwebtoken.verifyToken,userController.deleteUserById);
// app.get('/api/getalldata', userController.getAllData);

app.post('/api/allUser',jsonwebtoken.verifyToken,userController.getUser);

app.put('/api/disable/:userId',userController.disableuser);

app.listen(1802 , () =>
{  console.log("Server  listening at 1802 ");
});