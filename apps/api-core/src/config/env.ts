import dotenv from "dotenv";
import { z } from "zod";

const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
	path: `.env.${NODE_ENV}`,
});

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "staging", "production"]),

	PORT: z.string().transform(Number).pipe(z.number().int().positive()),

	DATABASE_URL: z.string().url(),

	REDIS_HOST: z.string(),

	REDIS_PORT: z.string().transform(Number).pipe(z.number().int()),

	LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("❌ Invalid environment variables");
	console.error(parsed.error.format());
	process.exit(1);
}

export const env = parsed.data;
