import { env } from "../config/env.ts";
import { Request, Response } from 'express';
import { handleIncomingMessage } from "../handlers/message.handler.js";

export const whatsappWebhook = (req: Request, res: Response) => {
	const mode = req.query["hub.mode"];
	const token = req.query["hub.verify_token"];
	const challenge = req.query["hub.challenge"];

	if (mode === "subscribe" && token === env.whatsappVerifyToken) {
		console.log("✅ Webhook verified");
		return res.status(200).send(challenge);
	}

	return res.sendStatus(403);
};

export const receiveMessage = async (req: Request, res: Response) => {
	try {
		// 👉 El middleware ya validó todo
		const { from, message, user } = req.whatsapp;

		await handleIncomingMessage(from, message, user);
	} catch (error) {
		console.error("❌ Error in receiveMessage:", error);
	}
};
