const express= require('express');
const app=express();
const port=8080;
const ExpressError=require('./ExpressErro.js');

/*
app.use((req,res,next)=>{
  console.log("I am first middlewares");
 res.send("I am sent by middlewares first")
  console.log("I am executed after first middlewares next")
})

app.use((req,res,next)=>{
  console.log("I am second middlewares");
  next()
})

*/

// Logger   

// app.use((req,res,next)=>{
//     req.time=new Date(Date.now());
//     console.log(req.path, req.hostname, req.method, req.time)
//     next();
// })

// app.use('/random',(req,res,next)=>{
//     console.log("I am the random route middleware")
//     next()
// })

// app.use('/',(req,res,next)=>{
//     console.log("I am the root middleware")
//     next()
// })


const accessToken=(req,res,next)=>{
    const {token}=req.query;
    if(token==="giveaccess"){
        next();
    }
    else{
        throw new ExpressError(401,"Access Denied")
    }
}

// app.use((req,res,next)=>{
//     res.send("I am error found page")
//     next(); 
// })

app.get('/api',accessToken,(req,res)=>{
    res.send("DATA")
})


app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.get('/err',(req,res)=>{
    abcd=abcd;
})

app.get('/admin',(req,res)=>{
    throw new ExpressError(402,"Unathorized access tried")
})

app.use((err,req,res,next)=>{
    const {status=500,message="Error Occured"}=err;
    console.log(message);
    res.status(status).send(message);
})

app.get('/random',(req,res)=>{
    res.send("Hi i am random root")
})

app.listen(port,(req,res)=>{
    console.log(`App is listening on port ${port}`);
})