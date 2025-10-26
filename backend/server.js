import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

dotenv.config();

console.log(process.env.MONGO_URL);

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://think-board-g7e3.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
// app.use(rateLimiter);

app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
