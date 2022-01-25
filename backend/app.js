import dotenv from "dotenv"
import express, { Router } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import { MONGOOSE_URI, CorsConfig } from "./config.js";
import  authRouter  from "./Routes/authRouter.js";
dotenv.config()
const app = express();


mongoose.connect(MONGOOSE_URI)
.then(() => console.log('Mongoose Connected Successfully'))
.catch((error)=> console.error(error.message));

app.use(express.json());
app.use(cors(CorsConfig));


app.use(express.urlencoded({ extended: false }));

app.use('/',authRouter);

// const bycriptjsHash = async () => {
//     const password = '1234'
//     const hashedPassword = await bcryptjs.hash(password, 8)

//     console.log(hashedPassword);
//     const isMatch = await bcryptjs.compare('1234', hashedPassword)
//     console.log(isMatch);
// }
// bycriptjsHash()


const port = process.env.PORT || 8080
app.listen(port, () => {
	console.log(`Server is running on ${port}`)
})

