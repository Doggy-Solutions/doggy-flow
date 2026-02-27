import { Request, Response } from "express";
import { createAppointment } from "./appointment.service.js";

export const createAppointmentHandler = async (req: Request, res: Response) => {
	try {
		const tenantId = req.tenant.id;
		const { employeeId, serviceId, clientPhone, startTime } = req.body;

		const appointment = await createAppointment(
			tenantId,
			employeeId,
			serviceId,
			clientPhone,
			startTime,
		);

		res.status(201).json(appointment);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal error" });
	}
};
