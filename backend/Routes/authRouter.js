import express from "express";
import User from "../models/user.js";
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const authRouter = express.Router()

authRouter.get('/users', async (req,res) => {
    const allUsers = await User.find()
    console.log(allUsers);
    res.send(allUsers)
})

authRouter.get('/users/:id', async (req,res) => {
    const { id } = req.params;
    const selectedUser = await User.findOne({ _id : id })
    res.send(selectedUser)
})

authRouter.get('/validate/:id/:password', async (req,res) => {
    const { id, password } = req.params;
    const selectedUser = await User.findOne({ _id : id })
    const isMatch = await bcryptjs.compare(password,selectedUser.password)
    console.log(isMatch)
    res.send({password : isMatch})
})


authRouter.post('/users', async (req,res) => {
    try {

        const {name,email,password} = req.body
        const newUser = new User({
            name,
            email,
            password
        });
        await newUser.save()
        
        res.send("User created")
    } catch (e) {
        res.status(400).send({error : e.message})
    }
})


export default authRouter ;