import mongoose from "mongoose";
import bcrypjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { validatePasswordCongruency } from "../services/index.js";

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email: {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    tokens: [{ 
        token: {
            type: String,
            required:true
        } 
    }]
});

UserSchema.methods.generateAuthToken = async function () { // .methods. available on instances
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'random');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}


UserSchema.statics.findByCredentials = async (email, password) => { // .statics. available on the model
    const user = await User.findOne({ email:email });
    if (!user) {
        throw new Error('Unable to login1');
    }
    const isMatch = await validatePasswordCongruency(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login2');
    }
    return user;
}


UserSchema.pre('save', async function (next) { // doing something before event (saving user)
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypjs.hash(user.password, 8);
    }
    next(); // call next when done (since it async function that's how it'll know)
})


const User = mongoose.model('User', UserSchema);

export default User;