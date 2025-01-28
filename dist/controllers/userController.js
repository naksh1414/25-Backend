"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.fetchAllUsers = exports.loginUser = exports.verifyOTP = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const otpService_1 = require("../services/otpService");
const jwtService_1 = require("../services/jwtService");
const bcryptUtil_1 = require("../utils/bcryptUtil");
const index_1 = require("../db/index");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, password } = req.body;
    yield (0, index_1.connectDB)();
    try {
        const existingUser = yield user_model_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = yield (0, bcryptUtil_1.hashPassword)(password);
        const otp = (0, otpService_1.generateOTP)();
        const user = new user_model_1.UserModel({
            name,
            email,
            phone,
            password: hashedPassword,
            otp,
            otpExpiresAt: Date.now() + 300000, // OTP valid for 5 minutes
        });
        yield user.save();
        yield (0, otpService_1.sendOTP)(phone, otp);
        res.status(201).json({ message: "User registered. OTP sent to phone." });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.registerUser = registerUser;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, otp } = req.body;
    try {
        const user = yield user_model_1.UserModel.findOne({ phone });
        if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        user.otp = null;
        user.otpExpiresAt = null;
        yield user.save();
        const token = (0, jwtService_1.generateToken)(user.id);
        res.status(200).json({ message: "OTP verified", token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.verifyOTP = verifyOTP;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.UserModel.findOne({ email });
        if (!user || !(yield (0, bcryptUtil_1.comparePassword)(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = (0, jwtService_1.generateToken)(user.id);
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
const fetchAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.UserModel.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchAllUsers = fetchAllUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const updateData = req.body;
    try {
        const user = yield user_model_1.UserModel.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated", user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
