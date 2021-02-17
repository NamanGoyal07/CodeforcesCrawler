const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//import routes
const authRoute = require("./routes/auth");
const postRoute = require('./routes/posts');
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true }, ()=>{
    console.log("Successfully connected to database");
});

// Middlewares
app.use(express.json());

//Route middlewares
app.use("/api/user",authRoute);
app.use('/api/posts', postRoute);

app.get("/",(req,res)=>{
    res.send("hello");
});

app.listen(3000,()=>{
    console.log("Hola, Server started on PORT 3000!");
});

