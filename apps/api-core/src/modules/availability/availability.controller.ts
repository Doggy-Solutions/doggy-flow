import { Request, Response } from "express";
import { AvailabilityService } from "./availability.service.js";

const availabilityService = new AvailabilityService();

export const getAvailability = async (req: Request, res: Response) => {
	const { employeeId, serviceId, date } = req.query;
	const tenantId = req.tenantId;

	const slots = await availabilityService.getAvailableSlots({
		tenantId,
		employeeId: String(employeeId),
		serviceId: String(serviceId),
		date: String(date),
	});

	res.json(slots);
};
