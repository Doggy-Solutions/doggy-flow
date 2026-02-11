import { pg } from "../db/postgress.js";

export class AppointmentRepository {
	static async create(data: any) {
		const { rows } = await pg.query(
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
}
