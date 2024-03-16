const express = require('express');
const { userRouter } = require('./routes/User.routes');
const { connection } = require('mongoose');
require('dotenv').config();


const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Home Pages");
})

app.use("/users", userRouter);


app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log(err.message);
    }
    console.log("Server is running at port 8080");
})
