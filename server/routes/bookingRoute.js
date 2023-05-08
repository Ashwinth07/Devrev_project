import express from "express";
import { Mangedetails, addbooking,getbook,getbooking } from "../controller/booking.js";

const router = express.Router();

router.post("/add",addbooking);
router.get("/getbook",getbook);
router.get("/get",getbooking);
router.get("/searchbookings",Mangedetails);



export default router;
