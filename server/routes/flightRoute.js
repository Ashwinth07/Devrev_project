import express from "express";
import { addflight, deleteflight, getdatedetails, getflight, getflights, gettimedetails } from "../controller/flight.js";

const router = express.Router();

router.post("/add",addflight);
router.get("/get",getflights);
router.delete("/:id",deleteflight);
router.get("/:flightNumber",getflight);
router.get("/get/:departureDate",getdatedetails);
router.get("/gettime/:departureTime",gettimedetails);

export default router;
