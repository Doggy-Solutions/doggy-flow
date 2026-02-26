import { addMinutes, isBefore } from "date-fns";
import { AvailabilityInput, TimeSlot } from "./availability.types.js";
import { ServiceRepository } from "../../infrastructure/repositories/service.repository.js";
import { AppointmentRepository } from "../../infrastructure/repositories/appointment.repository.js";
import { EmployeeRepository } from "../../infrastructure/repositories/employee.repository.js";

export class AvailabilityService {
	async getAvailableSlots(input: AvailabilityInput): Promise<TimeSlot[]> {
		const { tenantId, employeeId, serviceId, date } = input;

		const service = await ServiceRepository.findById(serviceId, tenantId);
		if (!service) throw new Error("Service not found");

		const duration = service.duration_minutes;

		const workingHours = await EmployeeRepository.getWorkingHoursForDate(
			employeeId,
			tenantId,
			date,
		);

		if (!workingHours) return [];

		const appointments = await AppointmentRepository.getByEmployeeAndDate(
			employeeId,
			tenantId,
			date,
		);

		const timeOff = await EmployeeRepository.getTimeOffForDate(
			employeeId,
			tenantId,
			date,
		);

		const slots = this.generateSlots(
			workingHours.start_time,
			workingHours.end_time,
			duration,
			date,
		);

		return slots.filter((slot) =>
			this.isSlotAvailable(slot, appointments, timeOff),
		);
	}

	private generateSlots(
		startTime: string,
		endTime: string,
		duration: number,
		date: string,
	): TimeSlot[] {
		const slots: TimeSlot[] = [];

		let cursor = new Date(`${date}T${startTime}`);
		const endBoundary = new Date(`${date}T${endTime}`);

		while (isBefore(addMinutes(cursor, duration), addMinutes(endBoundary, 1))) {
			slots.push({
				start: new Date(cursor),
				end: addMinutes(cursor, duration),
			});

			cursor = addMinutes(cursor, 15);
		}

		return slots;
	}

	private isSlotAvailable(
		slot: TimeSlot,
		appointments: any[],
		timeOff: any[],
	): boolean {
		for (const appt of appointments) {
			if (!(slot.start >= appt.end_time || slot.end <= appt.start_time)) {
				return false;
			}
		}

		for (const off of timeOff) {
			if (!(slot.start >= off.end_datetime || slot.end <= off.start_datetime)) {
				return false;
			}
		}

		return true;
	}
}
