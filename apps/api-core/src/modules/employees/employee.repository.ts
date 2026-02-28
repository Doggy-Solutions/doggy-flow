import {db } from "../../database/postgress.js";
export class EmployeeRepository {
	static async getWorkingHoursForDate(
		employeeId: string,
		tenantId: string,
		date: string,
	) {
		const dayOfWeek = new Date(date).getDay();

		const result = await db.query(
			`
      SELECT start_time, end_time
      FROM employee_working_hours
      WHERE employee_id = $1
        AND tenant_id = $2
        AND day_of_week = $3
      `,
			[employeeId, tenantId, dayOfWeek],
		);

		return result.rows[0];
	}

	static async getTimeOffForDate(employeeId: string, tenantId: string, date: string) {
		const result = await db.query(
			`
      SELECT start_datetime, end_datetime
      FROM employee_time_off
      WHERE employee_id = $1
        AND tenant_id = $2
        AND DATE(start_datetime) = $3
      `,
			[employeeId, tenantId, date],
		);

		return result.rows;
	}

	static async findByTenant(tenantId: string) {
		const result = await db.query(
			`SELECT id, name FROM employees WHERE tenant_id = $1; `,
			[tenantId]
		);

		return result.rows;
	}

	static async findById(employeeId: string, tenantId: string) {
		const result = await db.query(
			`SELECT id, name FROM employees WHERE id = $1 AND tenant_id = $2; `,
			[employeeId, tenantId]
		);

		return result.rows[0];
	}

	
};
