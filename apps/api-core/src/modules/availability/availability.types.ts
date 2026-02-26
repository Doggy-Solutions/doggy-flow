export interface AvailabilityInput {
  tenantId: string
  employeeId: string
  serviceId: string
  date: string // YYYY-MM-DD
}

export interface TimeSlot {
  start: Date
  end: Date
}