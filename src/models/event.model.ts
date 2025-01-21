import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";

const eventSchema = new Schema({
  slug: {
    type: String,
    unique: true,
    default: () => nanoid(8),
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
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

export const EventModel = model("Event", eventSchema);
