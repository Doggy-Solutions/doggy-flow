import { pool } from "../../config/db.js";
import { AvailabilityService } from "../availability/availability.service.js";

export const createAppointment = async (
	tenantId: string,
	employeeId: string,
	serviceId: string,
	clientPhone: string,
	startTime: string,
) => {
	const availabilityService = new AvailabilityService();

	const slots = await availabilityService.getAvailableSlots({
		tenantId,
		employeeId,
		serviceId,
		date: startTime.toString().split("T")[0],
	});

	const isValid = slots.some(
		(s) => s.start.getTime() === new Date(startTime).getTime(),
	);

	if (!isValid) {
		throw new Error("Slot no disponible");
	}

	const result = await pool.query(
		`
    INSERT INTO appointments (
        tenant_id,
        employee_id,
        service_id,
        client_phone,
        start_time
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
		[tenantId, employeeId, serviceId, clientPhone, startTime],
	);

	return result.rows[0];
};
