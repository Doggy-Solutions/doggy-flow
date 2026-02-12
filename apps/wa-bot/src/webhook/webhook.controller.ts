import { env } from "../config/env.js";
import { Request, Response } from "express";
import {
	handleIncomingMessage,
	handleMessage,
} from "../handlers/message.handler.js";
import axios from "axios";

export const whatsappWebhook = (req: Request, res: Response) => {
	const mode = req.query["hub.mode"];
	const token = req.query["hub.verify_token"];
	const challenge = req.query["hub.challenge"];

	if (mode === "subscribe" && token === env.whatsappWebHookVerifyToken) {
		console.log("✅ Webhook verified");
		return res.status(200).send(challenge);
	}

	return res.sendStatus(403);
};

export const receiveMessage = async (req: Request, res: Response) => {
	try {
		const entry = req.body.entry?.[0];
		const changes = entry?.changes?.[0];
		const message = changes?.value?.messages?.[0];

		if (!message) {
			return res.sendStatus(200);
		}

		const from = message.from;
		const body = message.text?.body;
		const phoneNumberId = changes.value.metadata.phone_number_id;

		console.log("Mensaje recibido:", from, body);

		// 🔹 Enviar a api-core
		await axios.post(`${env.apiCoreUrl}/messages/incoming`, {
			phoneNumberId,
			from,
			body,
		});

		res.sendStatus(200);
	} catch (error: any) {
		console.error("Error reenviando a api-core:", error.message);
		res.sendStatus(500);
	}
};
