import { SERVICES, BARBERS } from "./index.js";

export const SERVICE_BUTTONS = Object.entries(SERVICES).map(
	([id, service]) => ({
		id,
		title: service.label,
	}),
);

export const BARBER_BUTTONS = Object.entries(BARBERS).map(([id, barber]) => ({
    id,
    title: barber.label,
}));

export const CONFIRM_BUTTONS = [
	{ id: "CONFIRM_YES", title: "Confirmar" },
	{ id: "CONFIRM_NO", title: "Cancelar" },
];
