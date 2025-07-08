import express from "express";
import { getMessage, getUsersSiderbar, sendMessage } from "../controllers/messgae.controller.js";
import { checkAuth } from "../auth/checkAuth.js";

const Router = express.Router();

Router.get('/user', checkAuth ,getUsersSiderbar); 
Router.get('/:id',checkAuth ,getMessage);

Router.post('/send-message',checkAuth ,sendMessage)

export default Router;