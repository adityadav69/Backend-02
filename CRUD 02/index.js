const express=require('express');
const app=express();
const path=require('path');
const port=3000;
const Chat=require('./models/chat.js');
const mongoose=require('mongoose');

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, "public")));

connectDB()
.then(()=>{
    console.log("DB Connection successfull");
})
.catch((error)=>{
    console.log("DB Connection failed",error);
})

async function connectDB(){
    await mongoose.connect('mongodb://localhost:27017/instagramad');
}

app.get('/',(req,res)=>{
    res.render("index.ejs");
})

const newChat=new Chat({
    sender:"Aditya",
    receiver:"Alka",
    message:"Hey i am aditya"
});

// newChat.save()
// .then(()=>{
//     console.log("Data saved succesfully");
// })
// .catch((err)=>{
//     console.log("Error while saving the data");
// })
Chat.deleteMany({})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})