import { Router } from "express";
import  { EmployeeController } from "./employee.controller.js";

export const employeesRoutes = Router();

employeesRoutes.get("/", EmployeeController.getAllEmployeesByTenantHandler);
employeesRoutes.get("/:id", EmployeeController.getEmployeeByIdHandler);
