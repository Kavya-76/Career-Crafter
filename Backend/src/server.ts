import express from "express"
import connectDB from "./config/db.js"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
dotenv.config();

const app = express()

app.use(express.json())
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
    res.send("Server is running...")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})