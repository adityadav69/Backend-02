const express=require('express');
const app=express()
const port=3000;
const ExpressError=require("./ExpressError");


app.use("/api",(req,res,next)=>{
    const {token}=req.query;
    console.log(token)
    if(token==="giveaccess"){
        next();
    }
    else{
        throw new ExpressError(401,"Access Denied unauthorized Access");
    }
})

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.get("/api",(req,res)=>{
    res.send("data");
})

app.get("/random",(req,res)=>{
    res.send("Random Route");
})

app.get("/err",(req,res)=>{
    abcd=abcd;
})
app.get("/admin",(req,res)=>{
    throw new ExpressError(402,"You are unable to access admin ")
})

app.use((err,req,res,next)=>{
    console.log("ERROR HANDLED");
    res.send(err);
    
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})