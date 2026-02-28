import { Request, Response } from "express";
import { EmployeeService } from "./employee.service.js";


export class EmployeeController {
    static async getAllEmployeesByTenantHandler(req: Request, res: Response) {
        try {
            const tenantId = req.headers["x-tenant-id"] as string; // Assuming tenant ID is passed in headers
            console.log(tenantId);
            const employees = await EmployeeService.getAllEmployeesByTenant(tenantId);
        
            res.json({ employees: employees }); // Return the actual employees data
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal error" });
        }
    }

    static async getEmployeeByIdHandler(req: Request, res: Response) {
        try {
            const tenantId = req.headers["x-tenant-id"] as string; // Assuming tenant ID is passed in headers
            const employeeId = req.params.id as string; // Assuming employee ID is passed as a URL parameter
            const employee = await EmployeeService.getEmployeeById(employeeId, tenantId);
            if (!employee) {
                return res.status(404).json({ error: "Employee not found" });
            }
            res.json({ employee: employee }); // Return the actual employee data
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal error" });
        }
    }
}