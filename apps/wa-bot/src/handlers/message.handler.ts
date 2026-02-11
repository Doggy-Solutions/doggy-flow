import {
	getConversation,
	setConversation,
	resetConversation,
} from "../state/wa.state.store.js";

import {
	BOT_STATES,
	BARBERS,
	SERVICES,
	SERVICE_BUTTONS,
	BARBER_BUTTONS,
	CONFIRM_BUTTONS,
} from "../constants/index.js";

import {
	sendTextMessage,
	sendOptionsMessage,
	sendButtonMessage,
} from "../services/whatsapp.service.js";

import { apiClient } from '../services/api.services.js';

/**
 * =========================
 * Helpers
 * =========================
 */
const getUserInput = (message) => {
	if (message.type !== "interactive") {
		return message.text?.body?.trim().toLowerCase();
	}

	const interactive = message.interactive;

	if (interactive.type === "button_reply") {
		return interactive.button_reply.id;
	}

	if (interactive.type === "list_reply") {
		return interactive.list_reply.id;
	}

	return null;
};

/**
 * =========================
 * State Handlers
 * =========================
 */
const handleStart = async (from, user) => {
	setConversation(from, {
		state: BOT_STATES.SELECT_SERVICE,
		data: {},
	});

	await sendTextMessage(
		from,
		`👋 Hola ${user.profile?.name || "amigo"}, bienvenido a la barbería.`,
	);
	console.log("Service buttons");
	console.log(SERVICE_BUTTONS);

	await sendOptionsMessage(from, "¿Qué servicio deseas?", SERVICE_BUTTONS);
};

const handleSelectService = async (from, userInput) => {
	if (!SERVICES[userInput]) {
		await sendTextMessage(from, "❌ Selecciona un servicio válido.");
		return;
	}

	setConversation(from, {
		state: BOT_STATES.SELECT_BARBER,
		data: { service: SERVICES[userInput] },
	});

	await sendOptionsMessage(from, "¿Con qué barbero?", BARBER_BUTTONS);
};

const handleSelectBarber = async (from, conversation, userInput) => {
	if (!BARBERS[userInput]) {
		await sendTextMessage(from, "❌ Barbero inválido. Usa los botones.");
		return;
	}

	setConversation(from, {
		state: BOT_STATES.CONFIRM,
		data: {
			...conversation.data,
			barber: BARBERS[userInput],
		},
	});

	await sendButtonMessage(
		from,
		`📋 Confirma tu cita:
		Servicio: ${conversation.data.service.label}
		Barbero: ${BARBERS[userInput].label}`,
		CONFIRM_BUTTONS,
	);
};

const handleConfirm = async (from, userInput) => {
	if (userInput === "CONFIRM_YES") {
		await sendTextMessage(from, "✅ Cita confirmada.");
		resetConversation(from);
		return;
	}

	if (userInput === "CONFIRM_NO") {
		await sendTextMessage(
			from,
			"❌ Cita cancelada. Escribe *menu* para comenzar otra.",
		);
		resetConversation(from);
		return;
	}

	await sendTextMessage(
		from,
		"⚠️ Esta cita ya fue finalizada. Escribe *menu* para comenzar otra.",
	);
};

/**
 * =========================
 * Main
 * =========================
 */
export const handleIncomingMessage = async (from, message, user) => {
	const userInput = getUserInput(message);
	const conversation = getConversation(from);

	if (!conversation) {
		await handleStart(from, user);
		return;
	}

	console.log(
		`[BOT] ${from} | State: ${conversation.state} | Input: ${userInput}`,
	);

	switch (conversation.state) {
		case BOT_STATES.SELECT_SERVICE:
			await handleSelectService(from, userInput);
			break;

		case BOT_STATES.SELECT_BARBER:
			await handleSelectBarber(from, conversation, userInput);
			break;

		case BOT_STATES.CONFIRM:
			await handleConfirm(from, userInput);
			break;

		default:
			resetConversation(from);
			await sendTextMessage(from, "⚠️ Flujo reiniciado. Escribe *menu*.");
			break;
	}
};

export async function handleMessage(payload: any) {
	const entry = payload.entry[0];
	const change = entry.changes[0];
	const value = change.value;

	const phoneNumberId = value.metadata.phone_number_id;
	const from = value.messages?.[0]?.from;
	const text = value.messages?.[0]?.text?.body;

	await apiClient.post("/wa/inbound", {
		phone_number_id: phoneNumberId,
		from,
		text,
	});
}
