const express=require("express")
const app=express();
const port=8080;

app.use("/api",(req,res,next)=>{
    let {token}=req.query;
    if(token==="giveaccess"){
        next();
    }
    else{
        res.send("Please enter the correct token to accesss the data");
    }
})

app.get("/",(req,res)=>{
    res.send("Helooo...")
})
app.get("/random",(req,res)=>{
    res.send("random")
})

app.get("/api",(req,res)=>{
    res.send("data");
})
app.use((req,res)=>{
    console.log("I am middlewares");
    res.send("I am finished by middle ware");
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})