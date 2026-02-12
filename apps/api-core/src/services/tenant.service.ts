import { pool } from "../config/db.js";

export const getTenantByPhoneNumberId = async (phoneNumberId: string) => {
	const result = await pool.query(
		`
            SELECT t.id
            FROM tenants t
            JOIN whatsapp_numbers w ON w.tenant_id = t.id
            WHERE w.phone_number_id = $1
                AND t.status = 'active'
                AND w.status = 'active'
    `,
		[phoneNumberId],
	);

	return result.rows[0]; // { id: UUID }
};
