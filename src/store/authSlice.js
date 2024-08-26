import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LOGIN_URL } from '../utils/apiendpoints';
import { clearProfile } from './profileSlice'; 

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        loading: false,
    },
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        loginFailure: (state, action) => {
            state.error = action.payload || 'An error occurred';
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
} = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(LOGIN_URL, credentials);
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred';
        dispatch(loginFailure(errorMessage));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(logout());
    dispatch(clearProfile()); 
};

export default authSlice.reducer;
