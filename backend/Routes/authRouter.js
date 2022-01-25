import express from "express";
import { userProfile, getAllUsers, getUserById, validateUserPassword, createNewUser, userLogin } from "../controllers/index.js";
import authentication from "./middleware/authentication.js";


const authRouter = express.Router()

authRouter.post('/users', createNewUser)
authRouter.get('/users/login', userLogin)

authRouter.get('/users', getAllUsers)
authRouter.get('/users/me', authentication, userProfile)
authRouter.get('/users/:id', getUserById)
authRouter.get('/validate/:id/:password', validateUserPassword)



export default authRouter ;