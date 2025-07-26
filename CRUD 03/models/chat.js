const mongoose=require('mongoose');

let chatSchema=mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:50
    },
    to:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    }
})

let Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;