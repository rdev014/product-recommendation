import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {connect} from './database/connect';

// Load environment variables
dotenv.config();

const app = express();
const port: number = Number(process.env.PORT) || 8000;

// Middleware
app.use(
  cors({
    origin: process.env.MONGO_URI || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect to database
connect();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
