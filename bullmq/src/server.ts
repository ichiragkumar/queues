import dotenv from "dotenv"
dotenv.config()
import express from "express";
import userRoutes from "./routes/user";
import { connectToDb } from "./config/db";



connectToDb()
const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use("/users", userRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port 🚀 ${PORT}` );
});