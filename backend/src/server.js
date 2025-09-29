import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();
// Now process.env.PORT will have the value from your .env file
const PORT = process.env.PORT; 
connectDB();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(ratelimiter);
app.use("/api/notes", notesRoutes);


app.listen(PORT, () => {
    // Also updated this log to correctly display the port number
    console.log(`Server started on PORT ${PORT}`);
});