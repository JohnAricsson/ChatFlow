// npm init -y
// npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudarinary socket.io
// npm i nodemon -D

import express from "express"; //type module in server.js
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("api/auth", authRoutes);

app.listen(5001, () => {
  console.log("server is running on port: " + PORT);
  connectDB();
});
