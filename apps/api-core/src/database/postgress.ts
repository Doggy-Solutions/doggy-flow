import { config } from "../config/env.config.js";
import { Pool } from "pg";

export const db = new Pool(config.db);

db.on("connect", () => {
	console.log("✅ PostgreSQL connected");
});
