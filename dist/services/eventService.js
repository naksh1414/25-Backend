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
exports.EventService = void 0;
const event_model_1 = require("../models/event.model");
const team_model_1 = require("../models/team.model");
const members_model_1 = require("../models/members.model");
class EventService {
    createEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = new event_model_1.EventModel(eventData);
            return yield event.save();
        });
    }
    updateEvent(slug, eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_model_1.EventModel.findOneAndUpdate({ slug }, eventData, {
                new: true,
            });
        });
    }
    deleteEvent(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_model_1.EventModel.findOneAndDelete({ slug });
        });
    }
    flagDeleteEvent(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_model_1.EventModel.findOneAndUpdate({ slug }, { isDeleted: true }, { new: true });
        });
    }
    verifyPayment(teamCode, isVerified) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield team_model_1.TeamModel.findOneAndUpdate({ teamCode }, { isVerified }, { new: true });
        });
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_model_1.EventModel.find();
        });
    }
    getEventBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_model_1.EventModel.findOne({ slug });
        });
    }
    checkMemberResgistered(userId, eventSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamAsLeader = yield team_model_1.TeamModel.findOne({
                eventSlug,
                leaderId: userId
            });
            if (teamAsLeader)
                return true;
            // Check if user is a team member for this event
            const teamAsMember = yield team_model_1.TeamModel.findOne({
                eventSlug,
                members: {
                    $in: yield members_model_1.TeamMemberModel.find({ userId }).distinct('_id')
                }
            });
            console.log(teamAsMember);
            return !!teamAsMember;
        });
    }
}
exports.EventService = EventService;
