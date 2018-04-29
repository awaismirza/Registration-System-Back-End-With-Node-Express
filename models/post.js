var mongoose = require('mongoose');

module.exports = mongoose.model('post',{
    msg: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})