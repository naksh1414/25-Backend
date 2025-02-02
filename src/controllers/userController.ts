// userController.ts
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
// import { generateOTP, sendOTP } from "../services/otpService";
import { generateToken } from "../services/jwtService";
import { hashPassword, comparePassword } from "../utils/bcryptUtil";
import { UserPayload } from "../types";
import { STATUS_CODES } from "../constants/StatusCodes"
import { MESSAGES } from "../constants/messages"
import { sendSuccess, sendError } from "../utils/responseHandler";

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

    sendSuccess(res, MESSAGES.REGISTER_SUCCESS, null, STATUS_CODES.CREATED);
  } catch (error) {
    sendError(res, MESSAGES.SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER, error);   
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { phone, otp } = req.body;

  try {
    const user = await UserModel.findOne({ phone });

    if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
      return sendError(res, MESSAGES.INVALID_OTP, STATUS_CODES.BAD_REQUEST);
    }
    user.otp = "";
    user.otpExpiresAt = new Date(0);

    await user.save();

    const userPayload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.isAdmin ? "ADMIN" : "USER",
      slug: user.slug ?? undefined,
    };

    const token = generateToken(userPayload);
    sendSuccess(res, MESSAGES.OTP_VERIFY_SUCCESS, { token });
  } catch (error) {
    sendError(res, MESSAGES.SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER, error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await comparePassword(password, user.password))) {
      return sendError(res, MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED);
    }

    const userPayload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.isAdmin ? "ADMIN" : "USER",
      slug: user.slug ?? undefined,
    };

    const token = generateToken(userPayload);
    sendSuccess(res, MESSAGES.LOGIN_SUCCESS, { token });
  } catch (error) {
    sendError(res, MESSAGES.SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER, error);
  }
};

export const fetchAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    sendSuccess(res, MESSAGES.FETCH_SUCCESS, { users });
  } catch (error) {
    sendError(res, MESSAGES.SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateData = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      return sendError(res, MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    sendSuccess(res, MESSAGES.UPDATE_SUCCESS, { user });
  } catch (error) {
    sendError(res, MESSAGES.SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER, error);
  }
};
