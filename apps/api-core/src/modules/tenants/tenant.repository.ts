import { pg } from "../db/postgress.js";

export class TenantRepository {
	static async findByPhoneNumberId(phoneNumberId: string) {
		const { rows } = await pg.query(
			`
      SELECT t.*
      FROM tenants t
      JOIN whatsapp_numbers wn ON wn.tenant_id = t.id
      WHERE wn.phone_number_id = $1
      `,
			[phoneNumberId],
		);

		return rows[0];
	}
}
