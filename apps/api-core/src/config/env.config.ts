import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
	port: number | string;
	internalSecureToken: string;
	db: {
		host: string;
		user: string;
		password: string;
		database: string;
		port: number;
	};
	redis: {
		host: string;
		port: number;
	};
}

const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw new Error(`❌ Error de configuración: La variable de entorno '${key}' es obligatoria.`);
    }

    return value;
};

export const config: EnvConfig = {
	port: process.env.PORT || 3000,
	internalSecureToken: getEnv("INTERNAL_SECURE_TOKEN", "default-secure-token"),
	db: {
		host: getEnv("PG_HOST", "localhost"),
		user: getEnv("PG_USER", "postgres"),
		password: getEnv("PG_PASSWORD", "password"),
		database: getEnv("PG_DATABASE", "doggyflow"),
		port: Number(getEnv("PG_PORT", "5432")),
	},
	redis: {
		host: getEnv("REDIS_HOST", "localhost"),
		port: Number(getEnv("REDIS_PORT", "6379")),
	},
};
