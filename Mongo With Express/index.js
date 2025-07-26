const express=require('express')
const app=express();
const mongoose=require('mongoose')
const path=require('path')
const Chat=require("./models/chat.js");
const methodOverride = require('method-override');

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

main()
.then(()=>{
    console.log("Connection successfull")
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect("mongodb://localhost:27017/whatsApp")
}

app.get('/',(req,res)=>{
    res.send("Working..")
})

app.post('/chats/new',(req,res)=>{
    let {from,msg,to}=req.body;
    Chat.insertOne({
        from:from,
        msg:msg,
        to:to,
        created_at:Date.now()
    })
    res.redirect('/chats');
})
app.get('/chats',async(req,res)=>{
    let chats=await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats:chats})
})
app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
})

app.get('/chats/edit/:id',async(req,res)=>{
    const {id}=req.params;
    await Chat.findOne({_id:id})
    .then((result)=>{
        res.render("edit.ejs",{chat:result})
    })
})

app.put('/chats/:id',async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let {newmsg}=req.body;
    console.log(newmsg)
    await Chat.findByIdAndUpdate(id, { msg: newmsg }, { new: true, runValidators: true });
    res.redirect('/chats')
})

app.delete('/chats/:id',async(req,res)=>{
    let {id}=req.params;
    await Chat.deleteOne({_id:id});
    console.log(id);
    res.redirect('/chats')
})  

app.listen(8080,(req,res)=>{
    console.log("app is listening on port 8080")
})