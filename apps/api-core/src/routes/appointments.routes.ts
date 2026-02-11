import { Router } from "express";
import { AppointmentRepository } from "../infrastructure/repositories/appointment.repository.js";

const router = Router();

router.post("/", async (req, res) => {
	const appointment = await AppointmentRepository.create(req.body);
	res.json(appointment);
});

export default router;
