import { Router } from "express";
import { handleIncomingMessage } from "./message.controller.js";

export const messageRouter = Router();

messageRouter.post("/incoming", handleIncomingMessage);
