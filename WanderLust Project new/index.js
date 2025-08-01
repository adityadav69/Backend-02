const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Listing = require("./models/listing")
const path=require("path");


const port=3000;
const MONGO_URL="mongodb://localhost:27017/wanderLustNew"

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));

//DB CONNECTION

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

//ROUTES


app.get("/",(req,res)=>{
    res.send("Root working..")
})

app.get("/listings",async(req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})

app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});

})

// app.get("/test",(req,res)=>{
//     const newListing=new Listing({
//         title:"This is los Angelas",
//         description:"hello this is the buliding",
//         location:"india"
//     })
//     newListing.save()
//     .then(()=>{
//         console.log("Saved succesfully")
//         res.send("Success")
//     })
//     .catch((err)=>{
//         console.log("Error while saving the data",err);
//         res.send("error")
//     })

// })

//SERVER LISTEN

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})