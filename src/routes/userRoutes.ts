import express, { RequestHandler } from "express";
import { registerUser, verifyOTP, loginUser, fetchAllUsers, updateUser } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser as RequestHandler);
router.post("/verify-otp", verifyOTP as RequestHandler);
router.post("/login", loginUser as RequestHandler);
router.get("/users", authenticate as RequestHandler, fetchAllUsers as RequestHandler);
router.put("/users/:userId", authenticate as RequestHandler, updateUser as RequestHandler);

export default router;
