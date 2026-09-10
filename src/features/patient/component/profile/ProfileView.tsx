import {
    Stack,
} from '@mui/material';

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import type { Patient } from '../../types/patient.types';

import ProfileField from './ProfileField';
import { Button } from '../../../../component/ui';

interface ProfileViewProps {
    patient: Patient;
    onEdit: () => void;
    onClose: () => void;
}

export default function ProfileView({
    patient,
    onEdit,
    onClose,
}: ProfileViewProps) {
    return (
        <Stack spacing={3}>
            <ProfileField
                icon={<PersonOutlinedIcon />}
                label="Full Name"
                value={patient.fullName}
            />

            <ProfileField
                icon={<CakeOutlinedIcon />}
                label="Age"
                value={
                    patient.age != null
                        ? String(patient.age)
                        : '—'
                }
            />

            <ProfileField
                icon={<WcOutlinedIcon />}
                label="Gender"
                value={patient.gender || '—'}
            />

            <ProfileField
                icon={<PhoneOutlinedIcon />}
                label="Phone Number"
                value={patient.phoneNumber}
            />

            <ProfileField
                icon={<EmailOutlinedIcon />}
                label="Email"
                value={patient.email}
            />

            {/* Buttons for editing and closing the profile view */}

            <Stack
                direction="row"
                spacing={1.5}
                sx={{
                    justifyContent: 'flex-end',
                    mt: 4,
                }}
            >
                <Button
                    type="button"
                    variant="outlined"
                    onClick={onClose}
                >
                    Close
                </Button>

                <Button
                    type="button"
                    variant="contained"
                    startIcon={<EditOutlinedIcon />}
                    onClick={onEdit}
                >
                    Edit Profile
                </Button>
            </Stack>
        </Stack>

    );
}