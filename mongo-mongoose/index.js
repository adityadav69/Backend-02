const mongoose=require('mongoose')

main()
.then((res)=>{
    console.log('Connection established successfully'); 
})
.catch((err)=>{
    console.log(`Connection failed ${err}`);
    
})
async function main() {
    await mongoose.connect('mongodb://localhost:27017/college')
} 

const userSchema=mongoose.Schema({
    userName:String,
    email:String,
    password:String
})
const employeeSchema=mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    salary:Number
})

const User=mongoose.model("User",userSchema);
const Employee=mongoose.model("Employee",employeeSchema);

const user1=new User({
    userName:"Aditya Yadav",
    email:"adityayadaw42@gmail.com",
    password:"Aditya@42",
})
const user2=new User({
    userName:"Priyanshu Yadav",
    email:"priyanshuyadaw42@gmail.com",
    password:"priyanshu@42",
})

user1.save();
user2.save();