import axios, { AxiosError } from "axios";
import { env } from "../config/env.js";

/* =======================
   Tipos base
======================= */

type Phone = string | number;

export interface ButtonOption {
	id: string;
	title: string;
}

export interface ListRow {
	id: string;
	title: string;
	description?: string;
}

export interface ListSection {
	title: string;
	rows: ListRow[];
}

export interface ListMessagePayload {
	header?: string;
	body: string;
	buttonText: string;
	sections: ListSection[];
}

/* =======================
   Helpers
======================= */

// Solo toma los primeros 2 dígitos y los últimos 10
const cleanPhone = (phoneNumber: Phone): string => {
	const str = phoneNumber.toString();
	return str.slice(0, 2) + str.slice(-10);
};

const getHeaders = (): Record<string, string> => ({
	Authorization: `Bearer ${env.whatsappToken}`,
	"Content-Type": "application/json",
});

const getUrl = (): string =>
	`${env.metaApiUrl}/${env.whatsappPhoneNumberId}/messages`;

/* =======================
   Envío de mensajes
======================= */

export const sendTextMessage = async (
	to: Phone,
	text: string,
): Promise<void> => {
	try {
		await axios.post(
			getUrl(),
			{
				messaging_product: "whatsapp",
				to: cleanPhone(to),
				type: "text",
				text: { body: text },
			},
			{ headers: getHeaders() },
		);
	} catch (error) {
		logWhatsAppError(error);
		throw error;
	}
};

export const sendButtonMessage = async (
	to: Phone,
	body: string,
	buttons: ButtonOption[],
): Promise<void> => {
	if (!Array.isArray(buttons) || buttons.length === 0) {
		throw new Error("Buttons array is empty or invalid");
	}

	if (buttons.length > 3) {
		throw new Error("WhatsApp allows max 3 buttons");
	}

	const formattedButtons = buttons.map((btn) => ({
		type: "reply" as const,
		reply: {
			id: btn.id,
			title: btn.title.slice(0, 20),
		},
	}));

	try {
		await axios.post(
			getUrl(),
			{
				messaging_product: "whatsapp",
				to: cleanPhone(to),
				type: "interactive",
				interactive: {
					type: "button",
					body: { text: body },
					action: { buttons: formattedButtons },
				},
			},
			{ headers: getHeaders() },
		);
	} catch (error) {
		logWhatsAppError(error);
		throw error;
	}
};

export const sendListMessage = async (
	to: Phone,
	payload: ListMessagePayload,
): Promise<void> => {
	const { header, body, buttonText, sections } = payload;

	if (!sections?.length) {
		throw new Error("List sections are required");
	}

	try {
		await axios.post(
			getUrl(),
			{
				messaging_product: "whatsapp",
				to: cleanPhone(to),
				type: "interactive",
				interactive: {
					type: "list",
					header: header
						? { type: "text", text: header }
						: undefined,
					body: { text: body },
					action: {
						button: buttonText,
						sections,
					},
				},
			},
			{ headers: getHeaders() },
		);
	} catch (error) {
		logWhatsAppError(error);
		throw error;
	}
};

export const sendOptionsMessage = async (
	to: Phone,
	body: string,
	options: ButtonOption[],
): Promise<void> => {
	if (options.length <= 3) {
		return sendButtonMessage(to, body, options);
	}

	return sendListMessage(to, {
		header: "Opciones disponibles",
		body,
		buttonText: "Ver opciones",
		sections: [
			{
				title: "Opciones",
				rows: options.map(({ id, title }) => ({
					id,
					title,
				})),
			},
		],
	});
};

/* =======================
   Error handling
======================= */

const logWhatsAppError = (error: unknown): void => {
	console.error("❌ WhatsApp API Error");

	if (axios.isAxiosError(error)) {
		const err = error as AxiosError;
		console.error("Status:", err.response?.status);
		console.error(
			"Data:",
			JSON.stringify(err.response?.data, null, 2),
		);
	} else {
		console.error(error);
	}
};
