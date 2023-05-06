import express from "express";
import { addbooking } from "../controller/booking.js";

const router = express.Router();

router.post("/add",addbooking);


export default router;
