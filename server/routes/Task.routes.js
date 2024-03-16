const express = require("express");
const jwt = require("jsonwebtoken");
const { TaskModel } = require("../model/Task.model");

const taskRouter = express.Router();

taskRouter.get("/", async (req, res)=>{
    const token = req.headers.authorization;
    console.log(token);
    if(token){
        jwt.verify(token, 'magnetbrains', async(err, decoded)=>{
            if(decoded){
                let userId = decoded.userID;
                let tasks = await TaskModel.find();
                let userTasks = await TaskModel.find({user: userId});
                res.send({"tasks":tasks, "userTasks":userTasks});
            }
            else{
                res.send({"msg":err.message});
            }
          });
    }
    else{
        res.send({"msg":"Something really wrong"});
    }
    
})


taskRouter.post("/create", async (req, res)=>{

    const userId = req.body.user;

    try {
        const task = new TaskModel({
                 title : req.body.title,
                 description : req.body.description,
                 due_date : req.body.due_date,
                 createdBy : req.body.user
                });
        await task.save();
        res.send({"msg" : "New task has been created", "data" : task});
    } catch (err) {
        res.send({"msg":err.message})
    }
})

taskRouter.patch("/update/:id", async(req, res)=>{
    const payload = req.body;
    const id = req.params.id;
    const task = await TaskModel.findOne({"_id":id});
    const userID_of_task = task.createdBy;
    const userID_request = req.body.createdBy;
    try {
        if(userID_request !== userID_of_task){
            res.send({"msg":"You are not Authorized"});
        }
        else{
            await TaskModel.findByIdAndUpdate({"_id":id}, payload);
            res.send("Updated the Task");
        }
    } 
    catch(err){
        console.log(err.message);
        res.send({"msg":"Something went wrong"});
    }
})

taskRouter.delete("/delete/:id", async (req, res)=>{
    const payload = req.body;
    const id = req.params.id;
    const task = await TaskModel.findOne({"_id":id});
    const userID_of_task = task.createdBy;
    const userID_request = req.body.createdBy;
    try {
        if(userID_request !== userID_of_task){
            res.send({"msg":"You are not Authorized"});
        }
        else{
            await TaskModel.findByIdAndDelete({"_id":id});
            res.send("Deleted the Task");
        }
    } 
    catch(err){
        console.log(err.message);
        res.send({"msg":"Something went wrong"});
    }
})

module.exports = { taskRouter };