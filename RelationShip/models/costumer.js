const mongoose=require('mongoose')

main()
    .then(() => {
        console.log("connection successfull")
    })
    .catch((err) => {
        console.log("connection failed")
    })

async function main() {
    await mongoose.connect("mongodb://localhost:27017/relationDB");
}

const orderSchema=new mongoose.Schema({
    item:String,
    price:Number
})

const Order=new mongoose.model("Order",orderSchema);


const costumerSchema=new mongoose.Schema({
    name:String,
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order",
        },
    ],
});

const Costumer=new mongoose.model("Costumer",costumerSchema);

addCostumer=async()=>{
    let costumer1=await new Costumer({
        name:"aditya"
    })
    let order1=await Order.findOne({item:"chips"});
    let order2=await Order.findOne({item:"Samosa"});

    costumer1.orders.push(order1)
    costumer1.orders.push(order1)

    let result=await costumer1.save();
    console.log(result)
}
// addCostumer()

findCostumer=async()=>{
    let result=await Costumer.find({}).populate("orders")
    console.log(result[0])
}
findCostumer();

// addOrder=async () => {
//     let orders=await Order.insertMany([
//         {
//             item:"Samosa",
//             price:12
//         },
//         {
//             item:"chips",
//             price:10
//         }
//     ])
//     console.log(orders);
// }

// addOrder();