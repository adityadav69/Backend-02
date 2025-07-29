const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express()
const Chat=require('./models/chat');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const port=3000;
const methodOverride = require('method-override');


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}))

main()
.then((result)=>{
    console.log("DB Connection Successfull")
})
.catch((err)=>{
    console.log("DB Conection failed")
})

async function  main() {
    mongoose.connect("mongodb://localhost:27017/cukdb")
}

//Routes

app.get("/listings",async(req,res)=>{
    let chats=await Chat.find({});
    res.render("home.ejs",{chats})
})

app.get("/listings/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/listings",(req,res)=>{
    let {by,message,to}=req.body;
    console.log(by,message,to)
    Chat.insertOne({by,message,to})
    .then((result)=>{
        console.log("Chat inserted successfully",result)
        res.redirect("/listings")
    })
    .catch((err)=>{
        console.log("Chat insertion failed due to ",err);
        res.send("Please! Provide Correct details to Send the Message");
    })
})

app.get("/listings/edit/:id",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat})
})

app.put("/listings/:id",async(req,res)=>{
    let {msg}=req.body;
    let {id}=req.params;
    let updated=await Chat.findByIdAndUpdate(id,{message:msg},{runValidator:true, new:true});
    console.log(updated)
    res.redirect("/listings")
})

app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat)
    res.redirect("/listings");
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})