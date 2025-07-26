const express = require('express')
const mongoose=require('mongoose')

main()
.then((res)=>{
    console.log(`DB Connected Succesfully`)
})
.catch((err)=>{
    console.log(`DB Connection failed due to ${err}`)
})

async function main(){
    await mongoose.connect('mongodb://localhost:27017/amazon')
}

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
    },
    price:{
        type:Number
    }
})

const Book=mongoose.model("Book",bookSchema);

const book1=new Book({author:"RD Sharma", price:12000})

book1.save()
.then((res)=>{
    console.log(`Book data has been saved ${res}`)
})
.catch((err)=>{
    console.log(`Book data save failed ${err}`)
})