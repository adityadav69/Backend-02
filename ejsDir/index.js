const { log } = require('console');
const express=require('express')
const app=express()
const port=3000;

const path= require('path')

app.use(express.static(path.join(__dirname,"/public")))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))

app.get('/',(req,res)=>{
    // res.send("hello world you are on route path")
    res.render('index',{val:56})
    
})

app.get('/ig/:username',(req,res)=>{
    const {username}=req.params;
    const Instadata=require('./data.json')
    const data=Instadata[username];
    // console.log(data);
    if(!data){
        res.render("error")
    }
    res.render('instagram',{data})
})

app.get('/dice',(req,res)=>{
    let randomNumber=Math.floor(Math.random()*6)+1
    res.render('rollsDice',{value:randomNumber})
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
    
})