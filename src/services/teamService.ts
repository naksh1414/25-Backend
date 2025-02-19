import { UserModel } from "../models/user.model";
import { EventModel } from "../models/event.model";
import { TeamModel } from "../models/team.model";
import { TeamMemberModel } from "../models/members.model";

export class TeamService {
  async addTeam(TeamData: {
    eventId: string;
    eventSlug: string;
    leaderId: string;
    teamName: string;
    isVerified: boolean;
  }) {
    const { eventId, eventSlug, leaderId, teamName, isVerified } = TeamData;

    const existingEvent = await EventModel.findOne({ _id: eventId });
    if (!existingEvent) {
      throw new Error("Event not exists");
    }

    const existingTeam = await TeamModel.findOne({ eventId, teamName });
    if (existingTeam) {
      throw new Error("Team name already exists for this event");
    }

    const existingUser = await UserModel.findOne({ _id: leaderId });

    if (!existingUser) {
      throw new Error("User not exists");
    }

    const team = new TeamModel({
      eventId,
      eventSlug,
      leaderId,
      teamName,
      isVerified,
      isRegisterd: true,
    });

    const existingMember = await TeamMemberModel.findOne({
      id: leaderId,
      teamId: team.id,
    });

    if (existingMember) {
      throw new Error("User already exists in this team");
    }

    const member = new TeamMemberModel({
      teamId: team.id,
      teamName: team.teamName,
      userId: leaderId,
      role: "LEADER",
    });

    await member.save();

    existingEvent.teams.push(team.id);
    team.members.push(member.id);

    await existingEvent.save();

    await team.save();
    return team;
  }

  async joinTeam(TeamData: {
    teamId: string;
    teamName: string;
    userId: string;
  }) {
    const { teamId, teamName, userId } = TeamData;

    const existingTeam = await TeamModel.findOne({ _id: teamId, teamName });
    if (!existingTeam) {
      throw new Error("Team not exists");
    }

    const existingUser = await UserModel.findOne({ _id: userId });

    if (!existingUser) {
      throw new Error("User not exists");
    }

    const findEvent = await EventModel.findOne({ _id: existingTeam.eventId });

    if (!findEvent || existingTeam.members.length > findEvent.maxTeamSize) {
      throw new Error("Event not exists or team size is full");
    }

    const existingMember = await TeamMemberModel.findOne({
      userId,
      teamId,
      teamName,
    });

    if (existingMember) {
      throw new Error("User already exists in this team");
    }

    const member = new TeamMemberModel({
      teamId,
      teamName,
      userId,
      role: "MEMBER",
    });

    await member.save();

    existingTeam.members.push(member.id);

    await existingTeam.save();

    return member;
  }

  async fetchAllMembers() {
    return await TeamMemberModel.find();
  }


  async fetchTeamsbyEventId(eventId: string) {
    return await TeamModel.find({ eventId });
  }

  async fetchMembersbyTeamId(teamId: string) {
    return await TeamMemberModel.find({ teamId });
  }
}
