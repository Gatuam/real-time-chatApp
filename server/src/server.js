import express, { json, urlencoded } from "express";
import env from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectDb } from "./dbConfig/connectToDb.js";
import cookieParser from "cookie-parser";

env.config();
connectDb();
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`app is runng on ${process.env.PORT}`);
});
