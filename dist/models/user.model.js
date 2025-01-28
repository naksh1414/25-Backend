"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// user.model.ts
const mongoose_1 = require("mongoose");
const nanoid_1 = require("nanoid");
const userSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        unique: true,
        default: () => (0, nanoid_1.nanoid)(8),
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpiresAt: {
        type: Date,
        default: null,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: "",
    },
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
