import dotenv from "dotenv";
dotenv.config();

export const config = {
	port: process.env.PORT || 3000,
	waBotToken: process.env.WA_BOT_TOKEN,
	db: {
		host: process.env.PG_HOST,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		port: Number(process.env.PG_PORT),
	},
};
