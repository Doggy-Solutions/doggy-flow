import { db } from "../../database/postgress.js";
import { EmployeeRepository } from "./employee.repository.js";

export class EmployeeService {
    static async getAllEmployeesByTenant(tenantId: string) {

        try {
            const employees = await EmployeeRepository.findByTenant(tenantId);
            
            return employees;
        }  catch (error) {
            console.error("Error fetching employees:", error);
            throw new Error("Could not fetch employees");
        }
    }

    static async getEmployeeById(employeeId: string, tenantId: string) {
        try {
            const employee = await EmployeeRepository.findById(employeeId, tenantId);
            return employee;
        } catch (error) {
            console.error("Error fetching employee by ID:", error);
            throw new Error("Could not fetch employee");
        }
    }
}
