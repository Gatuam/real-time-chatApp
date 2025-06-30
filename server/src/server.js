import express from "express";
import env from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectDb } from "./dbConfig/connectToDb.js";

env.config();
connectDb();
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/app/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`app is runng on ${process.env.PORT}`);
});
