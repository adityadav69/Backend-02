const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listing")
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync")
const ExpressError = require("./utils/ExpressError")
const listingSchema = require("./schema");


const port = 3000;
const MONGO_URL = "mongodb://localhost:27017/wanderLustNew"

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, "public")))

app.engine("ejs", ejsMate);
//DB CONNECTION

main()
    .then(() => {
        console.log("DB Connection Successfull")
    })
    .catch(() => {
        console.log("DB Connection Failed")
    })

async function main() {
    mongoose.connect(MONGO_URL)
}

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

//ROUTES

app.get("/", (req, res) => {
    res.send("Root working..")
})

app.get("/listings", wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}))

//New Listings

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });

}))

//Add new Listing POST Request Handle

app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

}))

//Edit Form Serve Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}))

//Put request handling to update listing Route

app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {

    let { id } = req.params;
    let { listing } = req.body;
    let updatedDocument = await Listing.findByIdAndUpdate(id, listing);
    res.redirect(`/listings/${id}`);
}))

//Delete the listing

app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

app.get(/.*/, (req, res) => {
    throw new ExpressError(404, "Page Not Found");
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Somthing Went Wrond" } = err;
    res.status(statusCode).render("listings/error", { err });
})

//SERVER LISTEN

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

