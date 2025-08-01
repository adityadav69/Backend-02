const express=require('express')
const app=express()
const mongoose=require('mongoose')
const Listing=require("../models/listing");
const initData=require("./data");


const MONGO_URL="mongodb://localhost:27017/wanderLustNew"

main()
.then(()=>{
    console.log("DB Connection Successfull")
})
.catch(()=>{
    console.log("DB Connection Failed")
})

async function main() {
    mongoose.connect(MONGO_URL)
}

const initDb=async ()=>{
    await Listing.deleteMany({})
    console.log("data is deleted Successfully")
    let inserted_Data=await Listing.insertMany(initData.data);
    console.log(inserted_Data);
}
initDb()