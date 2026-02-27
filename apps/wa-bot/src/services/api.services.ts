import axios from "axios";

export const apiClient = axios.create({
	baseURL: process.env.API_CORE_URL,
	headers: {
		"x-service-token": process.env.WA_BOT_TOKEN,
	},
});

export const getAvailability = async (
	employeeId: string,
	serviceId: string,
	date: string,
) => {
	const response = await apiClient.get("/availability", {
		params: { employeeId, serviceId, date },
	});

	return response.data;
};

export const createAppointmentApi = async (data: any) => {
	const response = await apiClient.post("/appointments", data);
	return response.data;
};
