const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Chat = require("./models/chat");
const methodOverride=require("method-override");
const port=3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

main()
.then((result)=>{
    console.log("DB Connection Successfull")
})
.catch((err)=>{
    console.log("DB Connection Failed");
})

async function main() {
    await mongoose.connect("mongodb://localhost:27017/miniWhatsApp");
}

app.get("/",(req,res)=>{
    res.send("Root working..")
})

app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    res.render("index.ejs",{chats});
})

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    Chat.insertOne({from:from,msg:msg,to:to,createdAt:new Date()})
    .then((result)=>{
        console.log(result)
        res.redirect("/chats")
    })
    .catch((err)=>{
        console.log("Insertion falid due to ",err);
    })
})

app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    console.log(id)
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

app.patch("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg}=req.body;
    let chat=await Chat.findByIdAndUpdate(id,{msg:msg},{new:true},{runValidators: true});
    console.log(chat)
    res.redirect("/chats")
})

app.delete("/chats/:id/delete",(req,res)=>{
    let {id}=req.params;
    Chat.findByIdAndDelete(id)
    .then((result)=>{
        console.log(result);
        res.redirect("/chats");
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.listen(port,()=>{
    console.log(`App is listening on the port ${port}`);
})
