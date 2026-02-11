import axios from "axios";

export const apiClient = axios.create({
	baseURL: process.env.API_CORE_URL,
	headers: {
		"x-service-token": process.env.WA_BOT_TOKEN,
	},
});
