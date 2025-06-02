import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Alert,
  CircularProgress,
  Grid,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  PersonAdd as RegisterIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Lock as LockIcon
} from '@mui/icons-material';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    User_Name: '',
    User_Email: '',
    User_Password: '',
    User_Phone: '',
    User_Address: '',
    isPicker: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/CustomerAuth/register', form);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case 'User_Name':
        return <PersonIcon />;
      case 'User_Email':
        return <EmailIcon />;
      case 'User_Password':
        return <LockIcon />;
      case 'User_Phone':
        return <PhoneIcon />;
      case 'User_Address':
        return <HomeIcon />;
      default:
        return null;
    }
  };

  const getFieldLabel = (fieldName) => {
    return fieldName
      .replace('User_', '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <RegisterIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Account
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Join BharatWMS to manage your warehouse operations
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Grid container spacing={2} sx={{ width: '100%', m: 0 }}>
            {Object.keys(form).map((field) => (
              <Grid item xs={12} key={field} sx={{ width: '100%', p: 0 }}>
                {field === 'isPicker' ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form[field]}
                        onChange={handleChange}
                        name={field}
                      />
                    }
                    label={getFieldLabel(field)}
                  />
                ) : (
                  <TextField
                    required
                    fullWidth
                    id={field}
                    name={field}
                    label={getFieldLabel(field)}
                    type={field.includes('Password') ? 'password' : 'text'}
                    value={form[field]}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: getFieldIcon(field)
                    }}
                    sx={{ width: '100%' }}
                  />
                )}
              </Grid>
            ))}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{ fontWeight: 'bold' }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
