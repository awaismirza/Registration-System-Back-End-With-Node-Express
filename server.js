var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

mongoose.connect('mongodb://awais:abc@ds147459.mlab.com:47459/meanstack',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.listen(port);
