import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { sendSuccess, sendError } from "../utils/responseHandler";
import { STATUS_CODES } from "../constants/StatusCodes";
import { MESSAGES } from "../constants/messages";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async registerUser(req: Request, res: Response) {
    try {
      await this.userService.registerUser(req.body);
      sendSuccess(res, MESSAGES.REGISTER_SUCCESS, null, STATUS_CODES.CREATED);
    } catch (error: any) {
      sendError(res, error.message || MESSAGES.SERVER_ERROR, STATUS_CODES.BAD_REQUEST, error);
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const token = await this.userService.verifyOTP(req.body.phone, req.body.otp);
      sendSuccess(res, MESSAGES.OTP_VERIFY_SUCCESS, { token });
    } catch (error: any) {
      sendError(res, error.message || MESSAGES.SERVER_ERROR, STATUS_CODES.BAD_REQUEST, error);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const token = await this.userService.loginUser(req.body.email, req.body.password);
      sendSuccess(res, MESSAGES.LOGIN_SUCCESS, { token });
    } catch (error: any) {
      sendError(res, error.message || MESSAGES.SERVER_ERROR, STATUS_CODES.UNAUTHORIZED, error);
    }
  }

  async fetchAllUsers(_req: Request, res: Response) {
    try {
      const users = await this.userService.fetchAllUsers();
      sendSuccess(res, MESSAGES.FETCH_SUCCESS, { users });
    } catch (error: any) {
      sendError(res, MESSAGES.SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER, error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await this.userService.updateUser(req.params.userId, req.body);
      sendSuccess(res, MESSAGES.UPDATE_SUCCESS, { user });
    } catch (error: any) {
      sendError(res, error.message || MESSAGES.SERVER_ERROR, STATUS_CODES.BAD_REQUEST, error);
    }
  }
}
