import { useState } from 'react';

import {
    Alert,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import {
    changePasswordSchema,
    type ChangePasswordFormData,
} from '../../schemas/changePassword.schema';

import { useChangePassword } from '../../hooks/useChangePassword';

import { Button } from '../../../../component/ui';

export default function ChangePasswordForm() {
    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [successMessage, setSuccessMessage] =
        useState('');

    const {
        mutateAsync: changePassword,
        isPending,
        error,
        reset,
    } = useChangePassword();

    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: {
            errors,
        },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });


    const handleChangePassword = async (
        data: ChangePasswordFormData,
    ) => {
        try {
            setSuccessMessage('');
            reset();

            await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });

            setSuccessMessage(
                'Password changed successfully.',
            );

            resetForm();
        } catch (error) {
            console.error(
                'Failed to change password:',
                error,
            );
        }
    };

    const getErrorMessage = () => {
        if (!error) {
            return '';
        }

        if (axios.isAxiosError(error)) {
            const data = error.response?.data;

            if (typeof data === 'string' && data.trim()) {
                return data;
            }

            if (
                data &&
                typeof data === 'object'
            ) {
                if (
                    'message' in data &&
                    typeof data.message === 'string'
                ) {
                    return data.message;
                }

                if (
                    'error' in data &&
                    typeof data.error === 'string'
                ) {
                    return data.error;
                }

                if (
                    'detail' in data &&
                    typeof data.detail === 'string'
                ) {
                    return data.detail;
                }
            }

            return 'Unable to change your password.';
        }

        return 'Unable to change your password.';
    };


    return (
        <form
            noValidate
            onSubmit={handleSubmit(handleChangePassword)}
        >
            <Stack spacing={3}>
                {successMessage && (
                    <Alert severity="success">
                        {successMessage}
                    </Alert>
                )}

                {error && (
                    <Alert severity="error">
                        {getErrorMessage()}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Current Password"
                    type={
                        showCurrentPassword
                            ? 'text'
                            : 'password'
                    }
                    {...register('currentPassword')}
                    error={Boolean(
                        errors.currentPassword,
                    )}
                    helperText={
                        errors.currentPassword?.message
                    }
                    disabled={isPending}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        type="button"
                                        onClick={() =>
                                            setShowCurrentPassword(
                                                (previous) => !previous,
                                            )
                                        }
                                        edge="end"
                                        aria-label={
                                            showCurrentPassword
                                                ? 'Hide current password'
                                                : 'Show current password'
                                        }
                                    >
                                        {showCurrentPassword ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <TextField
                    fullWidth
                    label="New Password"
                    type={
                        showNewPassword
                            ? 'text'
                            : 'password'
                    }
                    {...register('newPassword')}
                    error={Boolean(errors.newPassword)}
                    helperText={
                        errors.newPassword?.message
                    }
                    disabled={isPending}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        type="button"
                                        onClick={() =>
                                            setShowNewPassword(
                                                (previous) => !previous,
                                            )
                                        }
                                        edge="end"
                                        aria-label={
                                            showNewPassword
                                                ? 'Hide new password'
                                                : 'Show new password'
                                        }
                                    >
                                        {showNewPassword ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={
                        showConfirmPassword
                            ? 'text'
                            : 'password'
                    }
                    {...register('confirmPassword')}
                    error={Boolean(
                        errors.confirmPassword,
                    )}
                    helperText={
                        errors.confirmPassword?.message
                    }
                    disabled={isPending}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (previous) => !previous,
                                            )
                                        }
                                        edge="end"
                                        aria-label={
                                            showConfirmPassword
                                                ? 'Hide confirmed password'
                                                : 'Show confirmed password'
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Button
                    type="submit"
                    disabled={isPending}
                >
                    {isPending
                        ? 'Changing Password...'
                        : 'Change Password'}
                </Button>
            </Stack>
        </form>
    );
}
