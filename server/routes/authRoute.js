import express from "express";
import { checkDailyUpdate, checkUpdated, decrementDailyFoodCount, getUserById, get_users_by_page, getregister, incrementDailyFoodCount, login, register, updateCostAllocatedForAllUsers, updateDailyFoodCountToZero} from "../controller/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/register", getregister);
router.get("/users/:page",get_users_by_page);
router.get("/user/:userId",getUserById);
router.put("/users/update",updateDailyFoodCountToZero);
router.put("/users/updatecost",updateCostAllocatedForAllUsers);
router.put('/users/:userId/increment', checkDailyUpdate, incrementDailyFoodCount);
router.put('/users/:userId/decrement', checkUpdated, decrementDailyFoodCount);

export default router;
