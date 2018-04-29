var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var auth = require('./auth');


const port = 3000;

var User = require('./models/user.js');
var Post = require('./models/post.js');

app.use(cors());
app.use(bodyParser.json());

app.get('/posts/:id',  async(req, res) =>{
    var author = req.params.id
    var posts = await Post.find({author})
    res.send(posts);
});

app.post('/post', (req, res)=>{

    var postData = req.body
    postData.author = '5ae1a7105a926e0f84230d61'

    var post = new Post(postData);

    post.save((err, result)=>{
        if(err){
            console.error('Saving Post Error');
            return res.status(500).send({message: 'Saving Post Causing an error'});
        }

        res.sendStatus(200);
    })
})

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

mongoose.connect('mongodb://awais:abc@ds147459.mlab.com:47459/meanstack',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.use('/auth', auth);

app.listen(port);
