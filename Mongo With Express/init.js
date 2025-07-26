const mongoose=require('mongoose')
const Chat=require("./models/chat.js");

main()
.then(()=>{
    console.log("Connection successfull")
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect("mongodb://localhost:27017/whatsApp")
}


const allChats = [
  { from: "Dipali", to: "Aditya", msg: "I love you ❤️", created_at: Date.now() },
  { from: "Ravi", to: "Pooja", msg: "How are you?", created_at: Date.now() },
  { from: "Sneha", to: "Amit", msg: "Let's meet tomorrow", created_at: Date.now() },
  { from: "Karan", to: "Nisha", msg: "Project done?", created_at: Date.now() },
  { from: "Tina", to: "Rahul", msg: "Call me when you're free", created_at: Date.now() },
  { from: "Anjali", to: "Mohit", msg: "Good night!", created_at: Date.now() },
  { from: "Vikram", to: "Simran", msg: "Did you watch the movie?", created_at: Date.now() },
  { from: "Neha", to: "Siddharth", msg: "Assignment complete?", created_at: Date.now() },
  { from: "Aarav", to: "Kriti", msg: "Happy Birthday! 🎉", created_at: Date.now() },
  { from: "Manish", to: "Divya", msg: "What's the plan for today?", created_at: Date.now() }
];


Chat.insertMany(allChats)
.then(()=>{
    console.log("Data saved succesfully");
})
.catch((err)=>{
    console.log("Data not saved");
})
