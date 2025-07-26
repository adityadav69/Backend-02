const express = require("express");
const app = express();
const User = require('./model/user');
const path = require('path');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

main()
    .then((res) => {
        console.log(`DB connection Successfull`);
    })
    .catch((err) => {
        console.log(`DB connection Failed`);
    })

async function main() {
    await mongoose.connect('mongodb://localhost:27017/adityaAuth');
}

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


app.get('/', (req, res) => {
    res.send("Hello world");
})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
})
app.get('/signup', (req, res) => {
    res.render('signup.ejs');
})
app.get('/dashboard', async (req, res) => {
    let token = req.cookies.token;
    try {
        let isVerfiedToken = jwt.verify(token, "ADITYA123");
        if (isVerfiedToken) {
            res.render('dashboard.ejs');
        }
    } catch (error) {
        res.redirect("/login");
    }
})

app.post('/signup', async (req, res) => {
    const { username, password, age, email } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    let user1 = await new User({
        username,
        password: hashPassword,
        email,
        age,
    })
    user1.save()
        .then((result) => {
            console.log("User addded to DB successfully")
            console.log(result);
            res.redirect("/login");
        })
        .catch((err) => {
            console.log("user creation failed due to ", err);
            res.send("please enter correct information about user");
        })
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    let isVerifiedUser = await bcrypt.compare(password, user.password);
    if (isVerifiedUser) {
        let token = jwt.sign({ email }, "ADITYA123")
        console.log(token);
        res.cookie("token", token);
        res.redirect('/dashboard');
    }
    else {
        res.send("Please enter correct email or password");
    }

})


app.listen(3000, () => {
    console.log("App is listening on port 3000");
})