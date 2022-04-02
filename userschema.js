const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    _id: {type: String},
    email:{type:String},
    password: {type: String}
})

module.exports = mongoose.model('User',userschema)