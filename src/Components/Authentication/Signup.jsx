import React, { useState } from 'react';
import supabase from '../../supabase';
import { TextField, Button, Typography, CircularProgress, Container, Box } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      alert('Signup successful! Please check your email for confirmation.');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5', // optional: light background color
      }}
    >
      <Container maxWidth="sm">
        <Box sx={styles.box}>
          <Typography variant="h4" sx={styles.heading}>Sign Up</Typography>

          <form onSubmit={handleSubmit} style={styles.form}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={styles.input}
              error={!!error}
              helperText={error ? error : ''}
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={styles.input}
              error={!!error}
              helperText={error ? error : ''}
            />

            {success && (
              <Typography color="success.main" sx={styles.success}>
                Signup successful! 🎉
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={styles.submitButton}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={styles.loader} /> : 'Sign Up'}
            </Button>
          </form>

          <Typography sx={styles.footer}>
            Already have an account?{' '}
            <a href="/signin" style={styles.link}>
              Login
            </a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: 3,
    backgroundColor: '#fff',
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
  },
  submitButton: {
    marginTop: '15px',
    padding: '12px',
    fontSize: '16px',
    '&:disabled': {
      backgroundColor: '#a1c4fd',
    },
  },
  loader: {
    color: '#fff',
  },
  footer: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  success: {
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default Signup;
