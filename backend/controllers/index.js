import User from "../models/user.js";
import { getUsers, validatePasswordCongruency } from '../services/index.js'

const userProfile = async (req, res) => {
    res.send(req.user);
};
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password); // User is the model
        const token = await user.generateAuthToken() // user is instance if User
        res.send({ user, token })
    } catch (e) {
        res.send({ error: e.message })
    }
}

const getAllUsers = async (req, res) => {
    const allUsers = await getUsers(true);
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
        const user = new User(req.body);
        await user.save()
        const token = await user.generateAuthToken() // user is instance of User
        res.send({ user, token });
    } catch (e) {
        res.send(e);
    }
}

export { getAllUsers, getUserById, validateUserPassword, createNewUser, userLogin, userProfile };