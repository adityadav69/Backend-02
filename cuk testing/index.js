const express=require('express')
const app=express()
const port=3000;
const mongoose=require('mongoose');
const Chat=require('./model/chat');
const path=require('path')

app.set('view engine','ejs');
// app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))

main()
.then((res)=>{
    console.log("DB Connection succesfully")
})
.catch((err)=>{
    console.log("Db connection failed",err)
})



async function main() {
    await mongoose.connect("mongodb://localhost:27017/cuk")
}
app.get('/',(req,res)=>{
    res.render("home.ejs");
})

app.get('/listing',async(req,res)=>{
    let chats=await Chat.find()
    // console.log(chats);
    res.render("listing.ejs",{chats});
})

app.get("/listing/new",(req,res)=>{
    res.render("new.ejs");
})

app.post('/listing',async(req,res)=>{
    let{sentby,message,recievedby}=req.body;
    await Chat.insertOne({sentby,message,recievedby})
    .then((data)=>{
        console.log("Chat inserted succesfully",data)
        res.redirect("/listing")
    })
    .catch((err)=>{
        console.log("Error while inserting the chats in the DB",err);
        res.send("Please enter the correct data");
    })
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})