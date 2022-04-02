const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require(__dirname+"/data")
const userschema1 = require(__dirname+"/userschema")

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});


app.post('/register', async (req, res) => {
    userschema1.findById(req.body.username,(err,docs) => {
    if(docs == null) {
        bcrypt.hash(req.body.password,10).then (hash => {
            const data = new userschema1 ({
                "_id": req.body.username,
                "email":req.body.email ,
                "password": hash
            })
            try{
                data.save()
                res.sendFile(path.join(__dirname,'./public/login.html'));
            }catch (error) {
                console.log(error)
            }
        })
    }else {
        res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
    }
})
})

 

app.post('/login', async (req, res) => {
    userschema1.findById(req.body.username, (err,docs) => {
        if(err) console.log(err)
        else {
            if(docs == null)
            res.sendFile(path.join(__dirname,'./public/registration.html'));
            else
            {
                bcrypt.compare(req.body.password, docs.password, (err,response)=>{
                    if(response) {
                        res.sendFile(path.join(__dirname,'./public/dashboard.html'));
                    }
                    else {
                        res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
                    }
                })
            }
        }
    })
    
});


server.listen(4000, function(){
    console.log("server is listening on port: 4000");
});