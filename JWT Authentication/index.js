const express=require('express')
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const port =3000;
const User=require("./models/user");
const SECRET = "ADITYA123";
const bcrypt = require("bcrypt");           // Bcrypt
const jwt = require("jsonwebtoken");        // JWT
const bodyParser = require("body-parser");  // Body parser
const cookieParser = require("cookie-parser");



app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true })); // Form data
app.use(cookieParser());        
main()
.then((res)=>{
    console.log("DB connection succesfull");
})
.catch((err)=>{
    console.log("DB connection failed")
})
async function main() {
    await mongoose.connect("mongodb://localhost:27017/Auth");
}

app.get('/',(req,res)=>{
    res.redirect('register.ejs')
})

app.get("/register",(req,res)=>{
    res.render("register.ejs");
})

app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.get("/dashboard", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.send("Unauthorized! <a href='/login'>Login karo</a>");

  try {
    const data = jwt.verify(token, SECRET);
    res.render("dashboard", { userId: data.userId });
  } catch {
    res.send("Invalid token!");
  }
});

//Register

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });
  res.redirect("/login");
});

//Login

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.send("Username Doesn't exist");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.send("Wrond password!");

  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1h" });
  res.cookie("token", token);
  res.redirect("/dashboard");
});

//Logut

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login")
});

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})
