import express, { json, urlencoded } from "express";
import env from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from './routes/meaage.route.js'
import { connectDb } from "./dbConfig/connectToDb.js";
import cookieParser from "cookie-parser";
import cors from 'cors'


env.config();
connectDb();
const app = express();

app.use(express.json({ limit: '80mb' }));
app.use(express.urlencoded({ extended: true, limit: '80mb' }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`app is runng on ${process.env.PORT}`);
});
