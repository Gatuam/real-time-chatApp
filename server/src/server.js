import express, { json, urlencoded } from "express";
import env from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/meaage.route.js";
import { connectDb } from "./dbConfig/connectToDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

env.config();
connectDb();

app.use(express.json({ limit: "80mb" }));
app.use(express.urlencoded({ extended: true, limit: "80mb" }));
const __dirname = path.resolve();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

server.listen(process.env.PORT, () => {
  console.log(`app is runng on ${process.env.PORT}`);
});
