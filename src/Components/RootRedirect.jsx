import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      navigate('/home'); // Redirect to home if email exists in localStorage
    } else {
      navigate('/signin'); // Redirect to signin if email does not exist
    }
  }, [navigate]);

  return null; // No UI is needed for this component
};

export default RootRedirect;
