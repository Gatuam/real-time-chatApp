import express from "express";
import { login, logout, signup, upadteProfile, verifyUser } from "../controllers/auth.controller.js";
import { checkAuth } from "../auth/checkAuth.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put('/update-prfile', checkAuth ,upadteProfile);

router.get('/check', checkAuth, verifyUser)

export default router;
