const express=require("express")
const app=express()
const port=4000;
const sendMail=require("./controller/sendMail")
const path =require("path")

app.set("view engine","ejs");
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.get('/send',(req,res)=>{
    res.render("index.ejs")
})

app.post("/send/mail", sendMail)

app.listen(port,()=>{
    console.log(`App is listening on the port ${port}`)
})