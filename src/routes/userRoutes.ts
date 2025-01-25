import express from "express";
import { registerUser, verifyOTP, loginUser, fetchAllUsers, updateUser } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.get("/users", authenticate, fetchAllUsers);
router.put("/users/:userId", authenticate, updateUser);

export default router;
