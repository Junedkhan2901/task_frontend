import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PROFILE_URL, UPDATE_PROFILE_URL } from '../utils/apiendpoints';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        error: null,
        loading: false,
    },
    reducers: {
        fetchProfileRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProfileSuccess: (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        },
        fetchProfileFailure: (state, action) => {
            state.error = action.payload || 'An error occurred';
            state.loading = false;
        },
        updateProfileRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess: (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        },
        updateProfileFailure: (state, action) => {
            state.error = action.payload || 'An error occurred';
            state.loading = false;
        },
        clearProfile: (state) => {
            state.profile = null;
            state.error = null;
        },
    },
});

export const {
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    clearProfile,
} = profileSlice.actions;

export const fetchProfile = () => async (dispatch) => {
    dispatch(fetchProfileRequest());
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(PROFILE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(fetchProfileSuccess(response.data.data));
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred';
        dispatch(fetchProfileFailure(errorMessage));
    }
};

export const updateProfile = (formData) => async (dispatch) => {
    dispatch(updateProfileRequest());
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.put(UPDATE_PROFILE_URL, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(updateProfileSuccess(response.data));
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred';
        dispatch(updateProfileFailure(errorMessage));
    }
};

export default profileSlice.reducer;
