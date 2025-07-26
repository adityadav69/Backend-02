const mongoose=require("mongoose");
const Chat=require("../models/chat");

main()
.then((result)=>{
    console.log("DB Connection Successfull")
})
.catch((err)=>{
    console.log("DB Connection Failed");
})

async function main() {
    await mongoose.connect("mongodb://localhost:27017/miniWhatsApp");
}

const dummyChats = [
  {
    from: "Alice",
    to: "Bob",
    msg: "Hey Bob, how are you?",
    createdAt: new Date()
  },
  {
    from: "Bob",
    to: "Alice",
    msg: "Hi Alice! I'm good, what about you?",
    createdAt: new Date()
  },
  {
    from: "Charlie",
    to: "Alice",
    msg: "Meeting at 3 PM today.",
    createdAt: new Date()
  },
  {
    from: "Alice",
    to: "Charlie",
    msg: "Okay, see you there!",
    createdAt: new Date()
  },
  {
    from: "Bob",
    to: "Charlie",
    msg: "Don't forget the report.",
    createdAt: new Date()
  }
];

Chat.insertMany(dummyChats)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})