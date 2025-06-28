import express, { json, urlencoded } from 'express';
import env from 'dotenv';
env.config();
const app = express();
app.use(json());
app.use(urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.send("hello");
})


app.listen(process.env.PORT, ()=>{
    console.log(`app is runng on ${process.env.PORT}`)
});