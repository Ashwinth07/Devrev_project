import express from "express";
import { addflight, deleteflight, getdatedetails, getflig, getflight, getflights, getname, gettimedetails } from "../controller/flight.js";

const router = express.Router();

router.get("/searchflights",getdatedetails);
router.post("/add",addflight);
router.get("/get",getflights);
router.get("/getflig",getflig);
router.delete("/delete/:id",deleteflight);
router.get("/:flightNumber",getflight);
router.get("/gettime/:departureTime",gettimedetails);
router.get("/getname/:id",getname);


export default router;
