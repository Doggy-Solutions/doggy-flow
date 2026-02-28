import {db } from "../../database/postgress.js";
export const EmployeeRepository = {
	async getWorkingHoursForDate(
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
	},

	async getTimeOffForDate(employeeId: string, tenantId: string, date: string) {
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
	},
};
