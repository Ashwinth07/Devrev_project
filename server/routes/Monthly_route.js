import express from "express";
import { bulkUploadEmployees } from "../controller/Monthly_controller.js";

const router = express.Router();


router.post("/bulk-upload", bulkUploadEmployees);

export default router;
