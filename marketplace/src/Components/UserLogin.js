import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from './store/authSlice';
import userService from '../services/dbService';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const loginType = new URLSearchParams(location.search).get('type') || 'user';

  const handleLogin = async () => {
    try {
      const user = await userService.login(username, password);
      if (!user) throw new Error('Invalid username or password');
      dispatch(loginAction({ username: user.username, userRole: user.role }));
      
      if (loginType === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Button color="primary" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    {error && (
                        <Typography color="error" align="center" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Typography variant="body2" align="center">
                        Don't have an account?{' '}
                        <Button color="primary" onClick={() => navigate('/register')}>
                            Register
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default UserLogin;
