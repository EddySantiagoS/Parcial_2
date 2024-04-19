import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./Login";
import RegisterForm from "./register";
import WelcomeScreen from "./Welcome";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    // Supongamos que el login es exitoso
    setIsAuthenticated(true);
  };

  const handleRegister = (username, email, password) => {
    // Supongamos que el registro es exitoso
    navigate("/"); // Navega de vuelta a la página de inicio de sesión
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <LoginForm
              onLogin={handleLogin}
              onShowRegister={() => navigate("/register")}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterForm
              onRegister={handleRegister}
              onShowLogin={() => navigate("/")}
            />
          }
        />
      </Routes>
    );
  }

  return <WelcomeScreen />;
}

export default App;
