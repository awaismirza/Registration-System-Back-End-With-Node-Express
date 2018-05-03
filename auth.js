var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var User = require('./models/user.js');
var express = require('express');
var router = express.Router();

router.post('/register', (req, res) =>{
        let userData = req.body;
        console.log(userData);
        let user = new User(userData);
    
        user.save((err, newUser) =>{
            if(err){
                return res.status(401).send({message: 'Error Registering the User'})
            }else {
                let payload = { sub: newUser._id }
    
                let token = jwt.encode(payload, '123')
            
                res.status(200).send({token})
            }
        })
    })

router.post('/login', async (req, res) =>{
        let userData = req.body;
        let user = await User.findOne({email: userData.email});
    
        if(!user){
            return res.status(401).send({message: 'Email or Password Invalid'})
        }
    
        bcrypt.compare(userData.password, user.password, (err, isMatch) =>{
            if(!isMatch){
                return res.status(401).send({message: 'Email or Password Invalid'})
            }
            
        let payload = { sub: user._id }
    
        let token = jwt.encode(payload, '123')
    
        res.status(200).send({token})
        })
    })
    module.exports = router
