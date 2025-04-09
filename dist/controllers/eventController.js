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
exports.EventController = void 0;
const eventService_1 = require("../services/eventService");
const responseHandler_1 = require("../utils/responseHandler");
const StatusCodes_1 = require("../constants/StatusCodes");
const messages_1 = require("../constants/messages");
const eventService = new eventService_1.EventService();
class EventController {
    // Add this method to your EventController class
    verifyPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { teamCode } = req.params;
                const { isVerified } = req.body;
                const team = yield eventService.verifyPayment(teamCode, isVerified);
                if (!team) {
                    return (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.TEAM_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
                }
                (0, responseHandler_1.sendSuccess)(res, messages_1.MESSAGES.PAYMENT_VERIFIED, { team });
            }
            catch (error) {
                (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.SERVER_ERROR, StatusCodes_1.STATUS_CODES.INTERNAL_SERVER, error);
            }
        });
    }
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield eventService.createEvent(req.body);
                (0, responseHandler_1.sendSuccess)(res, messages_1.MESSAGES.EVENT_CREATED, { event }, StatusCodes_1.STATUS_CODES.CREATED);
            }
            catch (error) {
                (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.SERVER_ERROR, StatusCodes_1.STATUS_CODES.INTERNAL_SERVER, error);
            }
        });
    }
    updateEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.params;
                const event = yield eventService.updateEvent(slug, req.body);
                if (!event) {
                    return (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.EVENT_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
                }
                (0, responseHandler_1.sendSuccess)(res, messages_1.MESSAGES.EVENT_UPDATED, { event });
            }
            catch (error) {
                (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.SERVER_ERROR, StatusCodes_1.STATUS_CODES.INTERNAL_SERVER, error);
            }
        });
    }
    checkMemberRegistered(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, eventSlug } = req.body;
                const isRegistered = yield eventService.checkMemberResgistered(userId, eventSlug);
                (0, responseHandler_1.sendSuccess)(res, messages_1.MESSAGES.EVENT_FETCH, { isRegistered });
            }
            catch (error) {
                (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.SERVER_ERROR, StatusCodes_1.STATUS_CODES.INTERNAL_SERVER, error);
            }
        });
    }
    deleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.params;
                const event = yield eventService.deleteEvent(slug);
                if (!event) {
                    return (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.EVENT_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
                }
                (0, responseHandler_1.sendSuccess)(res, messages_1.MESSAGES.EVENT_DELETED);
            }
            catch (error) {
                (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.SERVER_ERROR, StatusCodes_1.STATUS_CODES.INTERNAL_SERVER, error);
            }
        });
    }
    flagDeleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.body;
                const event = yield eventService.flagDeleteEvent(slug);
                if (!event) {
                    return (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.EVENT_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
                }
                (0, responseHandler_1.sendSuccess)(res, messages_1.MESSAGES.EVENT_DELETED);
            }
            catch (error) {
                (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.SERVER_ERROR, StatusCodes_1.STATUS_CODES.INTERNAL_SERVER, error);
            }
        });
    }
    getAllEvents(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield eventService.getAllEvents();
                (0, responseHandler_1.sendSuccess)(res, messages_1.MESSAGES.EVENT_FETCH, { events });
            }
            catch (error) {
                (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.SERVER_ERROR, StatusCodes_1.STATUS_CODES.INTERNAL_SERVER, error);
            }
        });
    }
    getEventBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.params;
                const event = yield eventService.getEventBySlug(slug);
                if (!event) {
                    return (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.EVENT_NOT_FOUND, StatusCodes_1.STATUS_CODES.NOT_FOUND);
                }
                (0, responseHandler_1.sendSuccess)(res, messages_1.MESSAGES.EVENT_FETCH, { event });
            }
            catch (error) {
                (0, responseHandler_1.sendError)(res, messages_1.MESSAGES.SERVER_ERROR, StatusCodes_1.STATUS_CODES.INTERNAL_SERVER, error);
            }
        });
    }
}
exports.EventController = EventController;
