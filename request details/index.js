const express=require("express")
const app=express();

app.get('/',(req,res)=>{
    res.send("I am root");
})

app.get('/apple',(req,res)=>{
    res.send("I am apple");
})

app.get('/search/:username',(req,res)=>{
    console.log(req.params)
    console.log(req.query)
    console.log(req.body)

    res.send("Search")
})

app.get('/banana',(req,res)=>{
    res.send("I am banana");
})

app.get('*',(req,res)=>{
    res.send("This doesnot exist");
})

app.listen(3000,()=>{
    console.log("App is listening on port 3000")
})