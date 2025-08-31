import express from "express";
import { getMessage, getUsersSiderbar, sendMessage } from "../controllers/messgae.controller.js";
import { checkAuth } from "../auth/checkAuth.js";

const Router = express.Router();

Router.get('/users', checkAuth ,getUsersSiderbar); 
Router.get('/chat/:id',checkAuth ,getMessage);

Router.post('/send/:id', checkAuth, sendMessage);

export default Router;