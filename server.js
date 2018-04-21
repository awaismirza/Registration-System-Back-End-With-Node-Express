var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const port = 3000;

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
    console.log(userData.email);
    res.sendStatus(200);    
});


app.listen(port);
