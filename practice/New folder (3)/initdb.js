const express=require('express');
const app=express();
const port=3000;
const mongoose=require("mongoose")
const Chat=require("./models/chat");

main()
.then((result)=>{
    console.log("DB Connection Successfull")
})
.catch((err)=>{
    console.log("DB Conection failed")
})

async function  main() {
    mongoose.connect("mongodb://localhost:27017/cukdb")
}

Chat.insertMany([
    { by: "Amit", message: "Hey, how are you?", to: "Rohit" },
  { by: "Rohit", message: "I am fine, you?", to: "Amit" },
  { by: "Sita", message: "Meeting kal 10 baje hai.", to: "Geeta" },
  { by: "Geeta", message: "Okay, I will be there.", to: "Sita" },
  { by: "Vikram", message: "Code push kar diya hai GitHub pe.", to: "Anil" },
  { by: "Anil", message: "Great work bro!", to: "Vikram" },
  { by: "Priya", message: "Lunch plan?", to: "Karan" },
  { by: "Karan", message: "Chal 2 baje chalte hai.", to: "Priya" },
  { by: "Neha", message: "Project report bhej di hai.", to: "Pooja" },
  { by: "Pooja", message: "Thanks, I will check.", to: "Neha" },
  { by: "Aditya", message: "Kal exam ke liye revise kar le.", to: "Rahul" },
  { by: "Rahul", message: "Haan yaar, kar raha hu.", to: "Aditya" },
  { by: "Manoj", message: "Server down hai kya?", to: "Suresh" },
  { by: "Suresh", message: "Abhi restart kar raha hu.", to: "Manoj" },
  { by: "Ramesh", message: "Party kab rakhe?", to: "Sanjay" }
])
.then((res)=>{
    console.log("Data inserted Successfully")
})
.catch((err)=>{
    console.log("Data insertion Failed",err)
})