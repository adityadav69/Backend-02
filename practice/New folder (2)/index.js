const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User=require('./model/user');
const path=require('path');
const { emit } = require('process');
const bcrypt=require('bcrypt')

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));

const port=3000;
main()
.then((res)=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("DB Conection Failed");
})

async function main() {
 await mongoose.connect("mongodb://localhost:27017/authInterview");
}

app.get('/signup',(req,res)=>{
    res.render("signup.ejs");
})

app.get('/login',(req,res)=>{
    res.render("login.ejs");
})
app.get('/logout',(req,res)=>{
    res.render("logout.ejs");
})
app.get('/dashboard',(req,res)=>{
    res.render("dashboard.ejs");
})

app.post('/signup',async(req,res)=>{
    let{email,password}=req.body;
    console.log(email,password)
    let hashPass=await bcrypt.hash(password,10);
    console.log(hashPass)
    let user1=new User({
        email,
        password:hashPass;
    })
    user1.save()
    .then((result)=>{
        console.log(result)
        res.redirect('/login');
    })
    .cat
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})