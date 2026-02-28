import { config } from "../config/env.js";
import pkg from 'pg';

const { Pool } = pkg;

export const pg = new Pool(config.db);

pg.on("connect", () => {
	console.log("✅ PostgreSQL connected");
});
