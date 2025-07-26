const express=require('express')
const app=express();
const path=require('path')
const port=3000;

const mongoose=require('mongoose')

main()
.then((res)=>{
    console.log(`DB connected Succesfully`);    
})
.catch((err)=>{
    console.log(`DB connection failed`);
})

const userSchema=mongoose.Schema({
    userName:String,
    password:String,
    age:Number
})

const User=mongoose.model("User",userSchema);

// User.insertMany([
//     {userName:"Aditya Yadav",password:"Adsad",age:43},
//     {userName:"hello Yadav",password:"Adsad",age:43},
//     {userName:"ada Yadav",password:"Adsad",age:43},
// ])

// let user2=User.findOne({userName:"Aditya Yadav",password:"Adsad"})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
    
// })

async function main() {
    await mongoose.connect("mongodb://localhost:27017/crudbasic");
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

// User.updateMany({userName:"alka yadav"},{age:999})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

User.deleteMany({userName:"ada Yadav"})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})


app.get('/',(req,res)=>{
    res.render("signup.ejs");
})

app.post('/user/new',(req,res)=>{
    const {userName, password, age}=req.body;
    const user1=new User({
        userName:userName,
        password:password,
        age:age
    })
    user1.save()
    .then((res)=>{
        console.log(`User is saved to db`);
    })
    .catch((err)=>{
        console.log(`user saved failed`); 
    })
    res.render('login.ejs')
})

app.post('/users/find',(req,res)=>{
    const {userName,password}=req.body;
    User.findOne({userName:userName, password:password})
    .then((response)=>{
        if(response){
        console.log(response);
        res.render("content.ejs")
        }
        else{
            throw err;
        }
       
    })
    .catch((err)=>{
        console.log(err);
        res.render('error');
    })
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})