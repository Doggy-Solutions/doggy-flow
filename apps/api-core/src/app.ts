import express from 'express';
import dotenv from 'dotenv';
import internalWaRoutes from './routes/internalWa.routes.js';
import { messageRouter } from './routes/message.routes.js';
import { appointmentsRouter } from './modules/appointments/appointments.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/internal', internalWaRoutes);
app.use("/messages", messageRouter);
app.use('/appointments', appointmentsRouter);

export default app;
