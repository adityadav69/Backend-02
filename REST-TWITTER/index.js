const express=require('express')
const app=express()
const path=require('path')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

const port=3000;

app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

let tweets=[
    {
        id:uuidv4(),
        username:"adityadav69",
        tweet:"Hey Sigma boy"
    },
    {
        id:uuidv4(),
        username:"priyanshu",
        tweet:"Hey Sigma boy 2"
    },{
        id:uuidv4(),
        username:"alka32",
        tweet:"Hey Sigma girl"
    },{
        id:uuidv4(),
        username:"simran45",
        tweet:"Hey i am simran"
    }
]


app.get('/tweets',(req,res)=>{
    res.render('index.ejs',{tweets})
})

app.patch('/tweets/edit/:id',(req,res)=>{
    let {id}=req.params;
    let {tweet}=req.body;
    let newTweet =tweets.find((t)=>t.id===id);
    newTweet.tweet=tweet;
    res.redirect("/tweets");
})

app.delete("/tweets/:id",(req,res)=>{
    let {id}=req.params;
    tweets =tweets.filter((t)=>t.id!=id);
    res.redirect('/tweets')
})

app.get('/tweets/edit/:id',(req,res)=>{
    let {id}=req.params;
    let tweet=tweets.find((t)=>t.id===id);
    res.render('edit.ejs',{tweet})
})



app.get('/tweets/new',(req,res)=>{
    res.render('new.ejs')
})


app.get('/tweets/:id',(req,res)=>{
    let {id}=req.params;
    let tweet=tweets.find((t)=>t.id===id);
    res.render("details.ejs",{tweet});
})

app.post('/tweets/new',(req,res)=>{
    let {username,tweet}=req.body;
    let id=uuidv4();
    tweets.push({id,username,tweet});
    res.redirect("/tweets")
})



app.listen(port,(req,res)=>{
    console.log(`App is listening on port ${port}`);
})