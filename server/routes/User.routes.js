const express = require('express');
const { UserModel } = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

// POST/Register user
// route "/users/register"
// access public
userRouter.post('/register', async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        console.log(req.body);
        bcrypt.hash(password, 5, async(err, hash) =>{
            if(err) res.send({"error" : err.message});
            else{
                const user = new UserModel({name, email, password : hash});
                await user.save();
                res.send({"msg" : "New User has been registered", "user":user});
            }
        });
    } catch (error) {
        res.send({"msg":"something went wrong", "error":error.message})
    }
    
})

// POST/Login user
// route "/users/login"
// access public
userRouter.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await UserModel.find({email});
        console.log(user);
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=> {
                // result == true
                if(result){
                    const token = jwt.sign({userID : user[0]._id}, "magnetbrains")
                    res.send({"msg":"User logged in", "token":token, "userId":user[0]._id});
                }
                else if(err){
                    res.send({"msg":"Something went wrong", "err":err.message});
                }
            });
            
        }
        else{
            res.send({"msg":"Something went wrong"})
        }
        
    } catch (err) {
        res.send({"error" : err.message});
    }
    
})


// GET user
// route "/users/"
// access public
userRouter.get('/', async (req, res)=>{
    try {
        const users = await UserModel.find();
        res.send({"user":users})
    } catch (err) {
        res.send({"msg":"Something went wrong"})
    }
})

module.exports = {userRouter}