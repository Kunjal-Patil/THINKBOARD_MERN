import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Diagnostic Logging ---
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`__dirname: ${__dirname}`);
// --- End Diagnostic Logging ---

// --- Middleware ---
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);

// --- API Routes ---
app.use("/api/notes", notesRoutes);

// --- Production Deployment Logic ---
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "..", "..", "frontend", "thinkboard", "dist");

  // --- Diagnostic Logging ---
  console.log(`Serving static files from: ${buildPath}`);
  // --- End Diagnostic Logging ---

  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    const indexPath = path.join(buildPath, "index.html");
    // --- Diagnostic Logging ---
    console.log(`Attempting to send file: ${indexPath}`);
    // --- End Diagnostic Logging ---
    res.sendFile(indexPath);
  });
}

// --- Start Server ---
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});

