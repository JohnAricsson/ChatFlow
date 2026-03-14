// npm init -y
// npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudarinary socket.io
// npm i nodemon -D
//npm i cors
import express from "express"; //type module in server.js
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
//use cors for frontend to communicate with backend because both are on different ports
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.listen(5001, () => {
  console.log("server is running on port: " + PORT);
  connectDB();
});
