import express from 'express';
import dotenv from 'dotenv';
import internalWaRoutes from './routes/internalWa.routes.js';
import { messageRouter } from './routes/message.routes.js';
// import servicesRoutes from './routes/services.routes.js';
// import appointmentsRoutes from './routes/appointments.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/internal', internalWaRoutes);
app.use("/messages", messageRouter);
// app.use('/services', servicesRoutes);
// app.use('/appointments', appointmentsRoutes);

export default app;
