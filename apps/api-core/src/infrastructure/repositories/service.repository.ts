import { pg } from "../db/postgress.js";

export class ServiceRepository {
	static async findByTenant(tenantId: string) {
		const { rows } = await pg.query(
			`SELECT * FROM services WHERE tenant_id = $1`,
			[tenantId],
		);

		return rows;
	}
}
