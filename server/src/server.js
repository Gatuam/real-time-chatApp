import express, { json, urlencoded } from 'express';
import env from 'dotenv';
import authRoutes from './routes/auth.routes.js'
env.config();
const app = express();
app.use(json());
app.use(urlencoded({extended: true}));

app.use('/app/auth', authRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`app is runng on ${process.env.PORT}`)
});