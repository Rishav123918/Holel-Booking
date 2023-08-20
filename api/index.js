import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"
// const crypto = require('crypto');
import crypto from "crypto"


const app=express()
const PORT = 8800;
dotenv.config()

const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    }catch(error){
        throw error;
    }
};
mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected")
})

// app.get("/",(req,res)=>{
//     res.send("hello")
// })
app.use(cors())
app.use(cookieParser())
app.use(express.json())

//middleware
app.use("/api/auth",authRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/users",usersRoute);

app.use((err,req,res,next)=>{
    // console.log("hii middleware")
    // next()
    const errorStatus=err.status||500
    const errorMessage=err.message||"something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
      });
    });  

    // const secretKey = crypto.randomBytes(32).toString('base64');
    // console.log(secretKey);

app.listen(PORT,()=>{
    connect()
    console.log("connected to backend");
    console.log(`Server is running on port ${PORT}`);
    
})

