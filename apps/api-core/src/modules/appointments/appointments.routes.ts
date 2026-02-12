import { Router } from "express";
import { createAppointmentHandler } from "./appointments.controller.js";

export const appointmentsRouter = Router();

appointmentsRouter.post("/", createAppointmentHandler);
