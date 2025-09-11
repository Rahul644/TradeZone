import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userName, userRole } = useSelector((state) => state.auth);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = (type) => {
        handleClose();
        navigate(`/login?type=${type}`);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#2196F3' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Marketplace
                </Typography>
                {userName ? (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                ) : (
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="account"
                        onClick={handleClick}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                )}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleLogin('user')}>
                        User Login
                    </MenuItem>
                    <MenuItem onClick={() => handleLogin('admin')}>
                        Admin Login
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
