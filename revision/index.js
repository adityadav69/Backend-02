const express=require('express')
const app=express();

const port = 3000;

// app.use((req,res)=>{
//     console.log("request recived")
//     // console.log("request is ",req)
//     // console.log("response is ",res)
// })

app.get("/",(req,res)=>{
    res.send("Hello i am root path")
})
app.get("/mango",(req,res)=>{
    res.send("Hello i am mango path")
})
app.get("/apple",(req,res)=>{
    res.send("Hello i am apple path")
})

app.get(/.*/, (req, res) => {
  res.send("This path doesn't exist");
  
});



app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})