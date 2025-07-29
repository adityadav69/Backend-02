const mongoose=require('mongoose')
const chatSchema=mongoose.Schema({
    by:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    }

})

const Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;