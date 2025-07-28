const express=require('express')
const app=express()
const port=3000;
const path=require('path')

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public/css")))
app.use(express.static(path.join(__dirname,"public/js")))


app.get('/',(req,res)=>{
    res.render("home.ejs")
})

app.get("/rolldice",(req,res)=>{
    let value=Math.floor((Math.random()*6)+1)
    res.render("rolldice",{value})
})

app.get("/ig/:username",(req,res)=>{
    let instaData=require('./instadata.json');
    let {username}=req.params;
    let data=instaData[username];
    res.render("instagram",{data})
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})