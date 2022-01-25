import mongoose from "mongoose";
import bcrypjs from 'bcryptjs';
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
    }
});

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email:email });
    if (!user) {
        throw new Error('Unable to login1');
    }
    const isMatch = await validatePasswordCongruency(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login2');
    }
    return user;
}


UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypjs.hash(user.password, 8)
    }
    console.log('just before saving');

    next() // call next when done (since it async function that's how it'll know)
}) // doing something before event (saving user)

const User = mongoose.model('User', UserSchema);

export default User;