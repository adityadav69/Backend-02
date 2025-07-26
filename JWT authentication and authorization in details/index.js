const express = require("express")
const app = express();
const cookieparser = require('cookie-parser');
const bcrypt=require('bcrypt');
const jsonwebtoken=require('jsonwebtoken')

app.use(cookieparser());

app.get("/", async(req, res) => {
    let hashPassword= await bcrypt.hash("aditya",10);
    // console.log(hashPassword);
    let token= await jsonwebtoken.sign({email:"adityayadaw42@gmail.com"},"ADITYA123");
    res.cookie("token",token);
    // console.log(token);
    res.send("Done")
})
app.get("/profile",async(req,res)=>{
    let data= await jsonwebtoken.verify(req.cookies["token"],"ADITYA123")
    console.log(data)
    res.send("Done");
})

// app.get("/profile", (req, res) => {
//     if (req.cookies["name"] == "aditdya") {
//         res.send("hello profile");
//     }
//     else{
//     res.send("Unauthorized access")
//     }
// })

app.listen(3000, () => {
    console.log("App is listening on port 3000");
})