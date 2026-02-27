import { pool } from "../../config/db.js";
import { AvailabilityService } from "../availability/availability.service.js";
import { addMinutes } from "date-fns";

export const createAppointment = async (
	tenantId: string,
	employeeId: string,
	serviceId: string,
	clientPhone: string,
	startTimeISO: string,
) => {
	const client = await pool.connect();

	try {
		await client.query("BEGIN");

		const availabilityService = new AvailabilityService();

		const startTime = new Date(startTimeISO);
		const date = startTime.toISOString().split("T")[0];

		const slots = await availabilityService.getAvailableSlots({
			tenantId,
			employeeId,
			serviceId,
			date,
		});

		const isValid = slots.some(
			(s) => s.start.getTime() === startTime.getTime(),
		);

		if (!isValid) {
			throw new Error("Slot no disponible");
		}

		// 🔒 Lock preventivo
		await client.query(
			`
      SELECT id
      FROM appointments
      WHERE employee_id = $1
        AND tenant_id = $2
        AND start_time = $3
      FOR UPDATE
      `,
			[employeeId, tenantId, startTime],
		);

		const serviceResult = await client.query(
			`
      SELECT duration_minutes
      FROM services
      WHERE id = $1
        AND tenant_id = $2
      `,
			[serviceId, tenantId],
		);

		if (!serviceResult.rows.length) {
			throw new Error("Service not found");
		}

		const duration = serviceResult.rows[0].duration_minutes;
		const endTime = addMinutes(startTime, duration);

		const result = await client.query(
			`
      INSERT INTO appointments (
        tenant_id,
        employee_id,
        service_id,
        client_phone,
        start_time,
        end_time,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6,'confirmed')
      RETURNING *
      `,
			[tenantId, employeeId, serviceId, clientPhone, startTime, endTime],
		);

		await client.query("COMMIT");

		return result.rows[0];
	} catch (error) {
		await client.query("ROLLBACK");
		throw error;
	} finally {
		client.release();
	}
};
