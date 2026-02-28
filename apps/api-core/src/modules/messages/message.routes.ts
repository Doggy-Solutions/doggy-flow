import { Router } from "express";
import { handleIncomingMessage } from "../modules/messages/message.controller.js";

export const messageRouter = Router();

messageRouter.post("/incoming", handleIncomingMessage);
