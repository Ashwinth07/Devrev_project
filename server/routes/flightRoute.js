import express from "express";
import { addflight, deleteflight, getflight } from "../controller/flight.js";

const router = express.Router();

router.post("/add",addflight);
router.delete("/:id",deleteflight);
router.get("/:flightNumber",getflight);

export default router;
