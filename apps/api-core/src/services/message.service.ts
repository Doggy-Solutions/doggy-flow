import { pool } from "../config/db.js";

export const saveMessage = async (from: string, body: string) => {
	await pool.query("INSERT INTO messages (from_number, body) VALUES ($1, $2)", [
		from,
		body,
	]);
};
