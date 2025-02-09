import { UserModel } from "../models/user.model";
import { generateToken } from "../services/jwtService";
import { hashPassword, comparePassword } from "../utils/bcryptUtil";
import { UserPayload } from "../types";
import { EventModel } from "../models/event.model";
import { TeamModel } from "../models/team.model";
import { TeamMemberModel } from "../models/members.model";

export class UserService {
  async registerUser(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) {
    const { name, email, phone, password } = userData;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();
    return user;
  }


  async verifyOTP(phone: string, otp: string) {
    const user = await UserModel.findOne({ phone });

    if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
      throw new Error("Invalid or expired OTP");
    }

    user.otp = "";
    user.otpExpiresAt = new Date(0);
    await user.save();

    const userPayload: Partial<UserPayload> = {
      id: user.id,
      email: user.email,
      name: user.name,
      slug: user.slug ?? undefined,
    };

    return generateToken(userPayload);
  }

  async loginUser(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const userPayload: Partial<UserPayload> = {
      id: user.id,
      email: user.email,
      name: user.name,
      slug: user.slug ?? undefined,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
    };

    return generateToken(userPayload);
  }

  async fetchAllUsers() {
    return await UserModel.find();
  }

  async updateUser(userId: string, updateData: any) {
    const user = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
