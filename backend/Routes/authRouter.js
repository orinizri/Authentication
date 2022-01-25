import express from "express";
import { getAllUsers, getUserById, validateUserPassword, createNewUser } from "../controllers/index.js";
import User from "../models/user.js";

const authRouter = express.Router()

authRouter.post('/users', createNewUser)
authRouter.post('/users/login', async (req,res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    res.send(user)
    } catch (e) {
        res.status(400).send({ error : e.message })
    }
})

authRouter.get('/users', getAllUsers)
authRouter.get('/users/:id', getUserById)
authRouter.get('/validate/:id/:password', validateUserPassword)



export default authRouter ;