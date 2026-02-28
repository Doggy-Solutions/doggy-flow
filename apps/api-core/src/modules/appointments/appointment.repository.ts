import { db } from "../../database/postgress.js";

export class AppointmentRepository {
	static async create(data: any) {
		const { rows } = await db.query(
			`
      INSERT INTO appointments
      (tenant_id, service_id, client_phone, start_time)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
			[data.tenant_id, data.service_id, data.client_phone, data.start_time],
		);

		return rows[0];
	}

	static async getByEmployeeAndDate(
		employeeId: string,
		tenantId: string,
		date: string,
	) {
		const result = await db.query(
			`
    SELECT start_time, end_time
    FROM appointments
    WHERE employee_id = $1
      AND tenant_id = $2
      AND DATE(start_time) = $3
      AND status IN ('confirmed','pending')
    `,
			[employeeId, tenantId, date],
		);

		return result.rows;
	}
}
