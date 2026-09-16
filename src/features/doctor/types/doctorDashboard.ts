export interface DoctorDashboard {
  cancelledAppointments: number;
  completedAppointments: number;
  scheduledAppointments: number;
  totalAppointments: number;
  totalPatients: number;
}

export interface DoctorDashboardResponse {
  code: string;
  data: DoctorDashboard;
  message: string;
}