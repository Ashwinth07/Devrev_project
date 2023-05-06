import express from "express";
import { addbooking,getbooking } from "../controller/booking.js";

const router = express.Router();

router.post("/add",addbooking);
router.get("/get",getbooking);



export default router;
