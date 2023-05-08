import express from "express";
import { getregister, login, register } from "../controller/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/register", getregister);

export default router;
