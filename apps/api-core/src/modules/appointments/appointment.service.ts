import { pool } from "../../config/db.js";

export const createAppointment = async (
	tenantId: string,
	employeeId: string,
	serviceId: string,
	clientPhone: string,
	startTime: string,
) => {
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
