const express=require('express')
const app=express()
const port=3000
const path=require('path')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride('_method'))

let posts=[
    {
        id:uuidv4(),
        user:"adityayadav69",
        content:"This is amazing posts written by Aditya Yadav"
    },

    {
        id:uuidv4(),
        user:"princesharma7985",
        content:"This is amazing posts written by Prince Sharma"
    },

    {
        id:uuidv4(),
        user:"ashishkumar4320",
        content:"This is amazing posts written by Ashish Kumar"
    }
]


app.get('/posts',(req,res)=>{
   res.render("index",{posts})
})

app.get('/posts/new',(req,res)=>{
    res.render("new")
})

app.get('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id)
    res.render("post",{post})
})

app.post('/posts',(req,res)=>{
    let {user,content}=req.body;
    let id=uuidv4();
    posts.push({user:user,content:content,id:id})    
    res.redirect('/posts')
})

app.get('/posts/:id/edit',(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id)
    res.render("edit",{post})
})

app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id)
    let newContent=req.body.content;
    post.content=newContent;
    res.redirect("/posts")
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>p.id!=id)
    res.redirect("/posts")
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})