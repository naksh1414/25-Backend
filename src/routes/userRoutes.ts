import express from "express";
import { UserController } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();
const userController = new UserController();

router.post("/register", (req, res) => userController.registerUser(req, res));

router.post("/verify-otp", (req, res) => userController.verifyOTP(req, res));

router.post("/login", (req, res) => userController.loginUser(req, res));

router.get("/users", authenticate, (req, res) =>
  userController.fetchAllUsers(req, res)
);

router.put("/users/:userId", authenticate, (req, res) =>
  userController.updateUser(req, res)
);


export default router;
