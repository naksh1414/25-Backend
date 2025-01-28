"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/register", userController_1.registerUser);
router.post("/verify-otp", userController_1.verifyOTP);
router.post("/login", userController_1.loginUser);
router.get("/users", authMiddleware_1.authenticate, userController_1.fetchAllUsers);
router.put("/users/:userId", authMiddleware_1.authenticate, userController_1.updateUser);
exports.default = router;
