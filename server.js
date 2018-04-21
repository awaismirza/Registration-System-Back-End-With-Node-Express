var express = require('express');
var cors = require('cors');
var app = express();

const port = 3000;

var posts = [
    {message: 'Hello World'},
    {message: 'what going on '}
]

app.use(cors());

app.get('/posts', (req, res) =>{
    console.log("Web Broswer Opened");
    res.send(posts);
});

app.listen(port);
