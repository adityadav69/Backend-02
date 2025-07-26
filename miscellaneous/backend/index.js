const express=require('express')
const app=express()

const port=3000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/register',(req,res)=>{    
    res.send(`Hello and welcome ${req.query.user}`)
})

app.post('/register',(req,res)=>{
    console.log(req.body);
    
    res.send(`Hello and welcome ${req.body.user}`)
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
    
})
