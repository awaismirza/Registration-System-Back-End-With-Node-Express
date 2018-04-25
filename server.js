var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');



const port = 3000;

var User = require('./models/user.js');

var posts = [
    {message: 'Hello World'},
    {message: 'what going on '}
]

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) =>{
    res.send(posts);
});

app.get('/users', async(req, res) =>{
    try {
        let users = await User.find({}, '-password -__v');
        res.send(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    
    
});

app.get('/profile/:id', async(req, res) =>{
    try {
        let user = await User.findById(req.params.id, '-password -__v');
        res.send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    
    
});

app.post('/register', (req, res) =>{
    let userData = req.body;
    console.log(userData);
    let user = new User(userData);

    user.save((err, result) =>{
        if(err){
            console.log("Having trouble Adding User");
        }else {
            res.sendStatus(200);
        }
    })
});

app.post('/login', async (req, res) =>{
    let userData = req.body;
    let user = await User.findOne({email: userData.email});

    if(!user){
        return res.status(401).send({message: 'Email or Password Invalid'})
    }

    bcrypt.compare(userData.password, user.password, (err, isMatch) =>{
        if(!isMatch){
            return res.status(401).send({message: 'Email or Password Invalid'})
        }
        
    let payload = {}

    let token = jwt.encode(payload, '123')

    res.status(200).send({token})
    })
});



mongoose.connect('mongodb://awais:abc@ds147459.mlab.com:47459/meanstack',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.listen(port);
