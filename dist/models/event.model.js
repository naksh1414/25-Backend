"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = require("mongoose");
const nanoid_1 = require("nanoid");
const eventSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        unique: true,
        default: () => (0, nanoid_1.nanoid)(8),
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    maxTeamSize: {
        type: Number,
        required: true,
    },
    minTeamSize: {
        type: Number,
        required: true,
    },
    registrationEndDate: {
        type: Date,
        required: true,
    },
    registrationStartDate: {
        type: Date,
        required: true,
    },
    eventDate: {
        type: Date,
    },
    fees: {
        type: Number,
        required: true,
    },
    prize: {
        type: Number,
        required: true,
    },
    teams: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Team",
        },
    ],
});
exports.EventModel = (0, mongoose_1.model)("Event", eventSchema);
