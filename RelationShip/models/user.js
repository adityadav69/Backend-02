const mongoose = require("mongoose")

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

const userSchema = new mongoose.Schema({
    username: String,
    address: [
        {
            _id:false,
            location: String,
            city: String
        }
    ]
})

const User = new mongoose.model("User", userSchema);

createUser = async () => {
    let user1 =await new User({
        username: "adityayadaw42",
        address: [
            {
                location: "cuk",
                city: "karnataka"
            }
        ]
    })
    console.log(user1);
    user1.address.push({
        location:"ABC.COM",
        city:"london",
    })
    await user1.save()

}
createUser();