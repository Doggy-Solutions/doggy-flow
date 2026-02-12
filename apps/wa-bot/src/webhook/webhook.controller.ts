import { env } from "../config/env.js";
import { Request, Response } from 'express';
import { handleIncomingMessage, handleMessage } from "../handlers/message.handler.js";

export const whatsappWebhook = (req: Request, res: Response) => {
	const mode = req.query["hub.mode"];
	const token = req.query["hub.verify_token"];
	const challenge = req.query["hub.challenge"];

	if (mode === "subscribe" && token === env.waBotToken) {
		console.log("✅ Webhook verified");
		return res.status(200).send(challenge);
	}

	return res.sendStatus(403);
};

export const receiveMessage = async (req: Request, res: Response) => {
	try {
		console.log(JSON.stringify(req.body, null, 2));
		res.sendStatus(200);
	} catch (error) {
		console.error("❌ Error in receiveMessage:", error);
	}
};
