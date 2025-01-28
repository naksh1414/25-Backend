// userController.ts
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { generateOTP, sendOTP } from "../services/otpService";
import { generateToken } from "../services/jwtService";
import { hashPassword, comparePassword } from "../utils/bcryptUtil";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;


  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    
    const user = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User registered. OTP sent to phone." });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { phone, otp } = req.body;

  try {
    const user = await UserModel.findOne({ phone });

    if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    const token = generateToken(user.id);
    res.status(200).json({ message: "OTP verified", token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const fetchAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateData = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
