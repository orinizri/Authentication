import User from "../models/user.js";
import { getUsers, validatePasswordCongruency } from '../services/index.js'


const getAllUsers = async (req, res) => {
    const allUsers = await getUsers(true);
    console.log(allUsers);
    res.send(allUsers);
}
const getUserById = async (req, res) => {
    const { id } = req.params;
    const selectedUser = await getUsers(false, id);
    res.send(selectedUser);
}
const validateUserPassword = async (req, res) => {
    const { id, password } = req.params;
    const selectedUser = await getUsers(false, id);
    const isMatch = await validatePasswordCongruency(password, selectedUser.password);
    res.send({ password: isMatch });
}
const createNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({
            name,
            email,
            password
        });
        await newUser.save();
        res.send("User created");
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
}

export { getAllUsers, getUserById, validateUserPassword, createNewUser };