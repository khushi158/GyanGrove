import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper, Link as MuiLink } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";

const SignIn = ({setIsAuthenticated}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
console.log(data);

      if (signInError) {
        setError(signInError.message); // Display error
      } else {
        setIsAuthenticated(true)
        localStorage.setItem("userEmail", data.user.email);
      
        navigate("/home"); // Redirect after successful sign-in
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f7fa",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: "bold" }}>
          Sign In
        </Typography>
        <Box component="form"  sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 1, mb: 2 }}
            >
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </Box>
        <Typography
          variant="body2"
          sx={{ mt: 3, color: "#555" }}
        >
          Don't have an account?{" "}
          <MuiLink onClick={()=>{navigate('/signup')}} color="primary" sx={{ textDecoration: "none" }}>
            Sign Up
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignIn;
