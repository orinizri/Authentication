import mongoose from "mongoose";
import bcrypjs from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email: {
        type : String
    },
    password : {
        type : String
    }
});

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