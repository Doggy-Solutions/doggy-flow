import { Request, Response } from "express";
import { saveMessage } from "../services/message.service.js";

export const handleIncomingMessage = async (req: Request, res: Response) => {
	try {
		const { from, body } = req.body;

		await saveMessage(from, body);

		res.status(200).json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal error" });
	}
};
