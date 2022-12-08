const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { connectDB, db } = require('./config/db');
const router = require('./controller/searchController');
const app = express();


connectDB().then(() => {
    const PORT = process.env.PORT | 3005;
    app.listen(PORT, () => {
        console.log('<-------------- BackendApp running on port ', PORT)
    })
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router)

app.get("/", function(req, res){
    res.send("Welcome to skybnb")   
})

app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path} `)
    next()
})

app.use(function (req, res, next) {
    const error = new Error(`Path Not Found - ${req.path}`);
    res.status(404);
    next(error);
})

app.use(function (err, req, res, next) {
    console.log("e", err);
    const status = res.statusCode;
    res.status(status);
    res.json({
        message: err.message || "There is some problem. Please try later.",
    });
})




