import { Schema, model } from "mongoose";

interface TeamMember {
  id: string;
  teamId: string;
  teamName: string;
  userId: string;
  role: "LEADER" | "MEMBER";
}

const teamMemberSchema = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["LEADER", "MEMBER"],
    required: true,
  },
});

export const TeamMemberModel = model("TeamMember", teamMemberSchema);
