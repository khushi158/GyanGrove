import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Components/Authentication/Signin";
import Signup from "./Components/Authentication/Signup";
import Home from "./Components/Home/Home";
import Navbar from "./Components/NavBar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setIsAuthenticated(!!userEmail);
  }, []);

  return (
    <div>
      {window.location.pathname !== '/signin' && 
       window.location.pathname !== '/signup' && 
       localStorage.getItem('userEmail') && 
       <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}
      
      <Routes>
        <Route path="/home" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/signin" element={<Signin isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;