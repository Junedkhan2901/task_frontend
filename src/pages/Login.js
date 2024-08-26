import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice'; 
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, user } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data) => {
        await dispatch(loginUser(data));
    };

    useEffect(() => {
        if (user) {
            enqueueSnackbar('Logged in successfully!', { variant: 'success' });
            navigate('/');
        }
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
        }
    }, [user, error, navigate, enqueueSnackbar]);

    return (
        <Container component="main" maxWidth="xs" sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginForm;
