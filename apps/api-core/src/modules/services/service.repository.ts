import { pg } from "../../database/postgress.js";

export class ServiceRepository {
	static async findByTenant(tenantId: string) {
		const { rows } = await pg.query(
			`SELECT * FROM services WHERE tenant_id = $1`,
			[tenantId],
		);

		return rows;
	}

	static async findById(serviceId: string, tenantId: string) {
		const { rows } = await pg.query(
			`SELECT * FROM services WHERE id = $1 AND tenant_id = $2`,
			[serviceId, tenantId],
		);

		return rows[0];
	}
}
