import express from "express";
import { login, logout, signup, upadteProfile } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put('/update-prfile', upadteProfile)

export default router;
