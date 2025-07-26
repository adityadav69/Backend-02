const e = require('express');
const express = require('express')
const app=express()
const port=3000;
const path=require('path');
const mongoose=require('mongoose');

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

main()
.then((res)=>{
    console.log("DB connected Succesfully");
})
.catch((err)=>{
    console.log("DB connection failed"); 
})

async function main() {
    await mongoose.connect('mongodb://localhost:27017/practice_crud');
}

const userSchema=mongoose.Schema({
    username:String,
    password:String
})

const User=mongoose.model("User",userSchema);

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.post('/users/new',(req,res)=>{
    const {username,password}=req.body;
    const user1=new User({username:username,password:password});
    user1.save()
    .then((res)=>{
        console.log(`Data Succesfully saved`);
    })
    .catch((err)=>{
        console.log("Data saved failed");    
    })

    res.send("Data saved to DB successfully");

})

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})