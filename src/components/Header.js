import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/authSlice'; 
import { useSnackbar } from 'notistack'; 
import '../assets/css/header.css';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar('You have been logged out successfully', { variant: 'info' });
        navigate('/');
    };

    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    {user ? (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/profile">My Profile</Link></li>
                            <li className="nav-item">
                                <button className="nav-link logout-button" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
