import express from "express";
import {
	receiveMessage,
	whatsappWebhook,
} from "./webhook/webhook.controller.js";
import { env } from "./config/env.js";
import axios from "axios";

const app = express();
app.use(express.json());

app.get("/webhook", whatsappWebhook);
app.post("/webhook", receiveMessage);

async function sendTestMessage() {
	try {
		await axios.post(
			`${env.metaApiUrl}/${env.whatsappPhoneNumberId}/messages`,
			{
				messaging_product: "whatsapp",
				to: "523121015530", // TU número con código país
				type: "template",
				template: {
					name: "hello_world",
					language: {
						code: "en_US",
					}
				},
			},
			{
				headers: {
					Authorization: `Bearer ${env.whatsappToken}`,
					"Content-Type": "application/json",
				},
			},
		);

		console.log("Mensaje enviado correctamente");
	} catch (error: any) {
		console.error(error.response?.data || error.message);
	}
}

app.listen(env.port, () => {
	console.log(`🤖 WA Bot running on port ${env.port}`);
	// sendTestMessage();
});
