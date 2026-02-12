import { Router } from "express";
import { handleIncomingMessage } from "../controllers/message.controller.js";

export const messageRouter = Router();

messageRouter.post("/incoming", handleIncomingMessage);
