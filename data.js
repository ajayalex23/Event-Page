const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MyDiary');
var userDB=mongoose.connection;
userDB.on('error', console.log.bind(console, "connection error"));
userDB.once('open', function(callback){
    console.log("connection succeeded");
})

module.exports = userDB;