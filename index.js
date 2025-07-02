import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser  from "body-parser";
import connectDb from "./config/Mongodb.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ProfileRoutes from "./routes/ProfileRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();


const port = process.env.PORT 
const app = express();
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth",AuthRoutes)
app.use("/api/profile", ProfileRoutes)
// connecting to database

app.get("/", (req, res) => {
    res.send("Welcome to the Mentorship Backend");
})



connectDb();

app.listen(port, ()=>{
    console.log(" server is running")

})