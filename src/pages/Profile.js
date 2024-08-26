import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../store/profileSlice'; 
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Paper, Avatar } from '@mui/material';

const Profile = () => {
    const dispatch = useDispatch();
    const { profile, error, loading } = useSelector((state) => state.profile);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            mobile_number: '',
            avatarurl: null
        }
    });

    const [avatarPreview, setAvatarPreview] = useState(profile?.avatarurl || null);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setValue('first_name', profile.first_name);
            setValue('last_name', profile.last_name);
            setValue('email', profile.email);
            setValue('mobile_number', profile.mobile_number);
            setAvatarPreview(profile.avatarurl);
        }
    }, [profile, setValue]);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('mobile_number', data.mobile_number);
        if (data.avatarurl && data.avatarurl[0]) {
            formData.append('avatarurl', data.avatarurl[0]);
        }
        dispatch(updateProfile(formData));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarPreview(profile?.avatarurl || null);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    My Profile Page
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '100%' }}>
                    <TextField
                        fullWidth
                        label="First Name"
                        margin="normal"
                        variant="outlined"
                        {...register('first_name', { required: 'First name is required' })}
                        error={!!errors.first_name}
                        helperText={errors.first_name?.message}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        margin="normal"
                        variant="outlined"
                        {...register('last_name', { required: 'Last name is required' })}
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email address',
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        label="Mobile Number"
                        margin="normal"
                        variant="outlined"
                        type="text"
                        {...register('mobile_number', {
                            required: 'Mobile number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Mobile number must be 10 digits',
                            },
                        })}
                        error={!!errors.mobile_number}
                        helperText={errors.mobile_number?.message}
                    />
                    <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                        {avatarPreview && (
                            <Avatar src={avatarPreview} sx={{ width: 100, height: 100, marginBottom: 2 }} />
                        )}
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                        >
                            Upload Avatar
                            <input
                                type="file"
                                hidden
                                {...register('avatarurl')}
                                onChange={handleFileChange}
                            />
                        </Button>
                    </Box>
                    {errors.avatarurl && <Typography color="error" sx={{ mt: 1 }}>{errors.avatarurl.message}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;
