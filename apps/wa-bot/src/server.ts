import express from "express";
import dotenv from "dotenv";
import { whatsappWebhook } from "./webhook/webhook.controller.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/webhook", whatsappWebhook);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`🤖 WA Bot running on port ${PORT}`);
});
