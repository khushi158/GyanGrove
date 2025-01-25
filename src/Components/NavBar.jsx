// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({isAuthenticated,setIsAuthenticated}) => {

  const navigate=useNavigate();
  // Check if the user is logged in
  useEffect(() => {
   if(!isAuthenticated){
      navigate('/signin');
   }
  }, []);

  const handleLogout = () => {
    navigate('/signin')
    localStorage.removeItem("userEmail");
    console.log('logout');
    setIsAuthenticated(false);
    
    
  };

  if (!isAuthenticated) return null; // Hide Navbar if the user is not signed in

  return (
    <motion.div
     
    >
      <AppBar

        color="primary"
      
        position="fixed"
        
        sx={{ top: 0, left: 0, right: 0, zIndex: 1201  , backgroundColor: "#1A202C", // Darker theme
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",}}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component={Link}
        
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              "&:hover": {
                color: "#F6E05E", // Highlight color on hover
                transition: "color 0.3s ease",
              },
            }}
            onClick={()=>navigate('/home')}
          >
            Inventories
          </Typography>
          <Box>
          
            <Button
            
              color="inherit"
              sx={{
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#2D3748",
                  color: "#F6E05E",
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;
