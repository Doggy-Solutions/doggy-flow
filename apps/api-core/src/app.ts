import express from 'express';
import dotenv from 'dotenv';
import internalWaRoutes from './routes/internalWa.routes.js';
import { messageRouter } from './modules/messages/message.routes.js';
import { appointmentsRouter } from './modules/appointments/appointments.routes.js';
import availabilityRoutes from './modules/availability/availability.routes.js';
import { employeesRoutes } from './modules/employees/employee.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/internal', internalWaRoutes);
app.use("/messages", messageRouter);
app.use('/appointments', appointmentsRouter);
app.use("/availability", availabilityRoutes);
app.use("/employees", employeesRoutes);

export default app;
