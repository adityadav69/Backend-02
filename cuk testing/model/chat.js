const mongoose=require('mongoose')

let chatSchema=new mongoose.Schema({
    sentby:String,
    message:String,
    recievedby:String
})
let Chat=new mongoose.model("Chat",chatSchema);
module.exports=Chat;
