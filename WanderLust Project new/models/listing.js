const mongoose=require('mongoose')

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1752805936214-bbdd8c94a576?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        set:(v)=> v==="" ? "https://images.unsplash.com/photo-1752805936214-bbdd8c94a576?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8" : v,
    },
    price:Number,
    location:String,
    country:String
})

const Listing=new mongoose.model("Listing",listingSchema);
module.exports=Listing;