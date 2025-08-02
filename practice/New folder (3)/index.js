const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const Chat = require('./models/chat');
const path = require('path');
const port = 3000;
const methodOverride = require('method-override');
const ExpressError = require("./ExpressError");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }))

main()
    .then((result) => {
        console.log("DB Connection Successfull")
    })
    .catch((err) => {
        console.log("DB Conection failed")
    })

async function main() {
    mongoose.connect("mongodb://localhost:27017/cukdb")
}

//Routes

app.get("/listings", async (req, res) => {
    try {
        let chats = await Chat.find({});
        res.render("home.ejs", { chats })
    } catch (err) {
        next(err);
    }

})

app.get("/listings/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/listings", (req, res) => {
    try {
        let { by, message, to } = req.body;
        console.log(by, message, to)
        Chat.insertOne({ by, message, to })
            .then((result) => {
                console.log("Chat inserted successfully", result)
                res.redirect("/listings")
            })
            .catch((err) => {
                console.log("Chat insertion failed due to ", err);
                res.send("Please! Provide Correct details to Send the Message");
            })
    } catch (error) {
        next(error)
    }

})

app.get("/listings/edit/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if (!chat) {
            throw new ExpressError(400, "This is asynchronus error");

        }
        res.render("edit.ejs", { chat })
    } catch (error) {
        next(error);
    }


})

app.put("/listings/:id", async (req, res) => {
    try {
        let { msg } = req.body;
        let { id } = req.params;
        let updated = await Chat.findByIdAndUpdate(id, { message: msg }, { runValidator: true, new: true });
        console.log(updated)
        res.redirect("/listings")
    } catch (error) {
        next(error);
    }

})

app.delete("/listings/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat)
        res.redirect("/listings");
    } catch (error) {
        next(error);
    }

})

app.use((err, req, res, next) => {
    console.log("Error handle")
    let { status, message } = err;
    res.status(status).send(message);
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})