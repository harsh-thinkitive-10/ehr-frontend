import { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Divider,
    Drawer,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useUpdateAppointmentStatus } from '../hooks/useUpdateAppointmentStatus';
import type { AdminAppointment } from '../types/adminAppointment';
import type { AppointmentStatus } from '../types/appointment';

interface AppointmentDetailsDrawerProps {
    open: boolean;
    appointment: AdminAppointment | null;
    onClose: () => void;
    onUpdated?: () => void;
}

const statusOptions: AppointmentStatus[] = ['SCHEDULED', 'CHECK_IN', 'RESCHEDULED', 'PENDING', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'CLOSED'];

export default function AppointmentDetailsDrawer({
    open,
    appointment,
    onClose,
    onUpdated,
}: AppointmentDetailsDrawerProps) {
    const [status, setStatus] = useState<AppointmentStatus>('SCHEDULED');
    const updateStatus = useUpdateAppointmentStatus();

    useEffect(() => {
        if (appointment) {
            setStatus(appointment.status);
        }
    }, [appointment]);
    if (!appointment) return null;

    const handleStatusUpdate = async () => {
        if (status === appointment.status) return;

        await updateStatus.mutateAsync({
            uuid: appointment.uuid,
            status,
        });

        onUpdated?.();
    };

    const appointmentDate = new Date(appointment.appointmentDate).toLocaleString();

    return (
        <Drawer anchor="right" open={open} onClose={updateStatus.isPending ? undefined : onClose}>
            <Box sx={{ width: { xs: '100vw', sm: 500 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" sx={{ p: 3, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                        <Box sx={{ width: 42, height: 42, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.light', color: 'primary.main' }}>
                            <EventAvailableIcon />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Appointment Details</Typography>
                            <Typography variant="body2" color="text.secondary">View and update appointment</Typography>
                        </Box>
                    </Stack>
                    <Button onClick={onClose} disabled={updateStatus.isPending} sx={{ minWidth: 40, width: 40, height: 40, p: 0 }}>
                        <CloseIcon />
                    </Button>
                </Stack>

                <Divider />

                <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
                    <Stack spacing={3}>
                        {updateStatus.isError && (
                            <Alert severity="error">Failed to update appointment status. Please try again.</Alert>
                        )}

                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>Appointment</Typography>
                            <Stack spacing={1}>
                                <DetailRow label="Date & Time" value={appointmentDate} />
                                <DetailRow label="Reason" value={appointment.reasonForVisit || '—'} />
                                <TextField
                                    select
                                    fullWidth
                                    label="Status"
                                    value={status}
                                    onChange={(event) => setStatus(event.target.value as AppointmentStatus)}
                                >
                                    {statusOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                        </Box>

                        <Divider />

                        <DetailsSection title="Patient" icon={<PersonOutlineOutlinedIcon />}>
                            <DetailRow label="Name" value={appointment.patientFullName} />
                            <DetailRow label="Age" value={String(appointment.patientAge)} />
                            <DetailRow label="Gender" value={appointment.patientGender} />
                            <DetailRow label="Email" value={appointment.patientEmail} />
                            <DetailRow label="Phone" value={appointment.patientPhoneNumber} />
                        </DetailsSection>

                        <Divider />

                        <DetailsSection title="Provider" icon={<MedicalServicesOutlinedIcon />}>
                            <DetailRow label="Name" value={appointment.doctorFullName} />
                            <DetailRow label="Specialization" value={appointment.doctorSpecialization} />
                            <DetailRow label="Email" value={appointment.doctorEmail} />
                            <DetailRow label="Phone" value={appointment.doctorPhoneNumber} />
                            <DetailRow label="Consultation Fee" value={`₹${appointment.consultationFee}`} />
                        </DetailsSection>

                        <Divider />

                        <DetailsSection title="Location" icon={<LocationOnOutlinedIcon />}>
                            <DetailRow label="Name" value={appointment.locationName ?? 'Not assigned'} />
                            <DetailRow label="Code" value={appointment.locationCode ?? '—'} />
                        </DetailsSection>
                    </Stack>
                </Box>

                <Divider />

                <Stack direction="row" spacing={1.5} sx={{ p: 2.5, justifyContent: 'flex-end' }}>
                    <Button variant="outlined" onClick={onClose} disabled={updateStatus.isPending}>Close</Button>
                    <Button variant="contained" onClick={handleStatusUpdate} disabled={updateStatus.isPending || status === appointment.status}>
                        {updateStatus.isPending ? 'Updating...' : 'Update Status'}
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <Stack direction="row" spacing={2}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>{label}</Typography>
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>{value}</Typography>
        </Stack>
    );
}

function DetailsSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
                {icon}
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{title}</Typography>
            </Stack>
            <Stack spacing={1}>{children}</Stack>
        </Box>
    );
}